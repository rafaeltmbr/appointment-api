import { Request, Response } from "express";

import {
  FindAppointmentDto,
  FindAppointmentUseCase,
} from "../../../../core/use_cases/FindAppointmentUseCase";
import {
  MakeAppointmentDto,
  MakeAppointmentUseCase,
} from "../../../../core/use_cases/MakeAppointmentUseCase";
import {
  CancelAppointmentDto,
  CancelAppointmentUseCase,
} from "../../../../core/use_cases/CancelAppointmentUseCase";
import { ListAvailableAppointmentHoursUseCase } from "../../../../core/use_cases/ListAvailableAppointmentHoursUseCase";
import { ListAllAppointmentsUseCase } from "../../../../core/use_cases/ListAllAppointmentsUseCase";

export class AppointmentController {
  constructor(
    private findAppointmentUseCase: FindAppointmentUseCase,
    private makeAppointmentUseCase: MakeAppointmentUseCase,
    private cancelAppointmentUseCase: CancelAppointmentUseCase,
    private listAllAppointmentsUseCase: ListAllAppointmentsUseCase,
    private listAvailableAppointmentHoursUseCase: ListAvailableAppointmentHoursUseCase
  ) {}

  async find(req: Request, res: Response): Promise<void> {
    const dto: FindAppointmentDto = {
      query: req.params.query as string,
    };

    const appointment = await this.findAppointmentUseCase.execute(dto);

    const content = {
      id: appointment.id,
      date: appointment.date,
      client_name: appointment.clientName,
      client_government_id: appointment.clientGovernmentId,
    };

    res.json(content);
  }

  async listAll(req: Request, res: Response): Promise<void> {
    const appointments = await this.listAllAppointmentsUseCase.execute();

    const content = appointments.map((appointment) => ({
      id: appointment.id,
      date: appointment.date,
      client_name: appointment.clientName,
      client_government_id: appointment.clientGovernmentId,
    }));

    res.json(content);
  }

  async make(req: Request, res: Response): Promise<void> {
    const dto: MakeAppointmentDto = {
      date: req.body.date,
      clientGovernmentId: req.body.client_government_id,
      clientName: req.body.client_name,
    };

    const appointment = await this.makeAppointmentUseCase.execute(dto);

    const content = {
      id: appointment.id,
      date: appointment.date,
      client_name: appointment.clientName,
      client_government_id: appointment.clientGovernmentId,
    };

    res.status(201).json(content);
  }

  async cancel(req: Request, res: Response): Promise<void> {
    const dto: CancelAppointmentDto = {
      id: req.params.id,
    };

    await this.cancelAppointmentUseCase.execute(dto);

    res.status(204).end();
  }

  async listAvailableHours(req: Request, res: Response): Promise<void> {
    const availableHours =
      await this.listAvailableAppointmentHoursUseCase.execute();

    const content = availableHours.map((e) => e.toISOString());

    res.json(content);
  }
}
