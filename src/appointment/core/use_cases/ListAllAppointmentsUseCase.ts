import {
  AppointmentRepository,
  ListAllAppointmentsRepositoryResults,
} from "../data/repositories/AppointmentRepository";

export class ListAllAppointmentsUseCase {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute(page: number): Promise<ListAllAppointmentsRepositoryResults> {
    return this.appointmentRepository.listAll(page);
  }
}
