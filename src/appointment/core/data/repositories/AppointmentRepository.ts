import { Id } from "../../../../shared/core/entities/Id";
import { Pagging } from "../../../../shared/core/entities/Pagging";
import {
  Appointment,
  Client,
  ClientGovernmentId,
  ClientName,
} from "../../entities/Appointment";

export interface ListAllAppointmentsRepositoryResults {
  appointments: Appointment[];
  pagging: Pagging;
}

export interface AppointmentRepository {
  findById(id: Id): Promise<Appointment | null>;
  findByClientName(name: ClientName): Promise<Appointment | null>;
  findByClientGovernmentId(
    governementId: ClientGovernmentId
  ): Promise<Appointment | null>;
  findByDate(date: Date): Promise<Appointment | null>;
  findAllByDates(dates: Date[]): Promise<Appointment[]>;
  listAll(page: number): Promise<ListAllAppointmentsRepositoryResults>;
  create(date: Date, client: Client): Promise<Appointment>;
  delete(appointment: Appointment): Promise<void>;
}
