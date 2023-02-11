import { describe, expect, it } from 'vitest'
import { Appointment } from '../entities/appointment';
import { CreateAppointment } from './create-appointment'
import { getFutureDate } from '../tests/utils/get-future-date';

describe('Create Appointment', () => {
  it('should be able to create an appointment', () => {
    const createAppointment = new CreateAppointment();

    const startsAt = getFutureDate('2023-08-10')
    const endsAt = getFutureDate('2023-08-11')

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt,
      endsAt
    })).resolves.toBeInstanceOf(Appointment)
  })
})