import { Appointment } from "../entities/appointment";
import type { AppointmentsRepository } from "../repositories/appointment-repository";

interface CreateAppointmentRequest {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

type CreateAppointmentResponse = Appointment;

export class CreateAppointment {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  async execute(
    req: CreateAppointmentRequest
  ): Promise<CreateAppointmentResponse> {
    const { customer, startsAt, endsAt } = req;

    const overLappingAppointment =
      await this.appointmentsRepository.findOverlappingAppointment(
        startsAt,
        endsAt
      );

    if (overLappingAppointment) {
      throw new Error("Another appointment overlaps this appointment dates.");
    }

    const appointment = new Appointment({
      customer,
      startsAt,
      endsAt,
    });

    await this.appointmentsRepository.create(appointment);

    return appointment;
  }
}
