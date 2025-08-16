import { Appointment } from "../entities/Appointment";
import { AppointmentRepository } from "../data/repositories/AppointmentRepository";

export class ListAllAppointmentsUseCase {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute(): Promise<Appointment[]> {
    return this.appointmentRepository.listAll();
  }
}
