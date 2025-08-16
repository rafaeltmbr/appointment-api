import { Id } from "../../../../shared/core/entities/Id";
import { Pagging } from "../../../../shared/core/entities/Pagging";
import {
  AppointmentRepository,
  ListAllAppointmentsRepositoryResults,
} from "../../../core/data/repositories/AppointmentRepository";
import {
  Appointment,
  Client,
  ClientGovernmentId,
  ClientName,
} from "../../../core/entities/Appointment";

export class AppointmentRepositoryInMemory implements AppointmentRepository {
  private appointments: Appointment[] = [];

  constructor(private pageSize: number = 5) {}

  async findById(id: Id): Promise<Appointment | null> {
    return this.appointments.find((a) => a.id === id.value) ?? null;
  }

  async findByClientName(name: ClientName): Promise<Appointment | null> {
    return this.appointments.find((a) => a.clientName === name.value) ?? null;
  }

  async findByClientGovernmentId(
    governementId: ClientGovernmentId
  ): Promise<Appointment | null> {
    return (
      this.appointments.find(
        (a) => a.clientGovernmentId === governementId.value
      ) ?? null
    );
  }

  async findByDate(date: Date): Promise<Appointment | null> {
    return this.appointments.find((a) => a.date === date.toISOString()) ?? null;
  }

  async findAllByDates(dates: Date[]): Promise<Appointment[]> {
    const dateStrings = new Set(dates.map((d) => d.toISOString()));
    return this.appointments.filter((a) => dateStrings.has(a.date));
  }

  async listAll(page: number): Promise<ListAllAppointmentsRepositoryResults> {
    const pagging = new Pagging(this.appointments.length, this.pageSize, page);

    const slicingInterval = pagging.getItemsSlicingInterval();
    const appointments = this.appointments.slice(
      slicingInterval.start,
      slicingInterval.end
    );

    return { appointments, pagging };
  }

  async create(date: Date, client: Client): Promise<Appointment> {
    const id = new Id();
    const appointment = new Appointment(id, date, client);
    this.appointments.push(appointment);
    return appointment;
  }

  async delete(appointment: Appointment): Promise<void> {
    const index = this.appointments.findIndex((a) => a.id === appointment.id);
    if (index >= 0) {
      this.appointments.splice(index, 1);
    }
  }
}
