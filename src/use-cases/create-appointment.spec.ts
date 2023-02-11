import { describe, expect, it } from 'vitest'
import { Appointment } from '../entities/appointment';
import { CreateAppointment } from './create-appointment'
import { getFutureDate } from '../tests/utils/get-future-date';
import { InMemoryAppointmentRepository } from '../repositories/in-memory/in-memory-appointment-repository';

describe('Create Appointment', () => {
  it('should be able to create an appointment', () => {

    const appointmentRepository = new InMemoryAppointmentRepository();
    const createAppointment = new CreateAppointment(appointmentRepository);

    const startsAt = getFutureDate('2023-08-10')
    const endsAt = getFutureDate('2023-08-11')

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt,
      endsAt
    })).resolves.toBeInstanceOf(Appointment)
  })

  it('should not be able to create an appointment with overlapping dates', async () => {

    const appointmentRepository = new InMemoryAppointmentRepository();
    const createAppointment = new CreateAppointment(appointmentRepository);

    const startsAt = getFutureDate('2023-08-10')
    const endsAt = getFutureDate('2023-08-15')

    await createAppointment.execute({
      customer: 'John Doe',
      startsAt,
      endsAt
    })

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2023-08-14'),
      endsAt: getFutureDate('2023-08-18')
    })).rejects.toBeInstanceOf(Error)

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2023-08-08'),
      endsAt: getFutureDate('2023-08-12')
    })).rejects.toBeInstanceOf(Error)

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2023-08-08'),
      endsAt: getFutureDate('2023-08-17')
    })).rejects.toBeInstanceOf(Error)

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2023-08-11'),
      endsAt: getFutureDate('2023-08-12')
    })).rejects.toBeInstanceOf(Error)
  })
})