import {
  Appointment,
  ClientGovernmentId,
  ClientName,
} from "../entities/Appointment";
import { AppointmentRepository } from "../data/repositories/AppointmentRepository";
import { AppointmentError } from "../entities/AppointmentError";
import { Id } from "../../../shared/core/entities/Id";

export interface FindAppointmentDto {
  query: string;
}

export class FindAppointmentUseCase {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute(dto: FindAppointmentDto): Promise<Appointment> {
    try {
      const id = new Id(dto.query);
      const found = await this.appointmentRepository.findById(id);
      if (found) return found;
    } catch {}

    try {
      const governmentId = new ClientGovernmentId(dto.query);
      const found = await this.appointmentRepository.findByClientGovernmentId(
        governmentId
      );
      if (found) return found;
    } catch {}

    try {
      const name = new ClientName(dto.query);
      const found = await this.appointmentRepository.findByClientName(name);
      if (found) return found;
    } catch {}

    throw new AppointmentError(
      "appointment_not_found",
      "Appointment not found."
    );
  }
}
