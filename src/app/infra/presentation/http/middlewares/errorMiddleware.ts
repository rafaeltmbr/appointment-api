import { Request, Response, NextFunction } from "express";
import { CelebrateError } from "celebrate";

import {
  DomainError,
  DomainErrorCode,
} from "../../../../../shared/core/entities/DomainError";
import {
  AppointmentError,
  AppointmentErrorCode,
} from "../../../../../appointment/core/entities/AppointmentError";

interface ApiErrorResponse {
  status: number;
  content: {
    code: string;
    message: string;
  };
}

export function errorMiddleware(
  error: any,
  _: Request,
  res: Response,
  __: NextFunction
): void {
  let response: ApiErrorResponse;

  if (error instanceof DomainError) {
    response = DomainErrorHandler.formatResponse(error);
  } else if (error instanceof AppointmentError) {
    response = AppointmentErrorHandler.formatResponse(error);
  } else if (error instanceof CelebrateError) {
    response = CelebrateErrorHandler.formatResponse(error);
  } else {
    response = ServerErrorHandler.formatResponse(error);
    console.error(response.content, error);
  }

  res.status(response.status).json(response.content);
}

class DomainErrorHandler {
  private static statusMapper: Record<DomainErrorCode, number> = {
    invalid_value: 400,
    unknown: 500,
  };

  static formatResponse(error: DomainError): ApiErrorResponse {
    const status = DomainErrorHandler.statusMapper[error.code];

    const content = {
      code: error.code,
      message: error.message,
    };

    return { status, content };
  }
}

class AppointmentErrorHandler {
  private static statusMapper: Record<AppointmentErrorCode, number> = {
    appointment_already_exists: 400,
    appointment_date_already_taken: 400,
    appointment_date_unavailable: 400,
    appointment_not_found: 404,
    appointment_past_date: 400,
  };

  static formatResponse(error: AppointmentError): ApiErrorResponse {
    const status = AppointmentErrorHandler.statusMapper[error.code];

    const content = {
      code: error.code,
      message: error.message,
    };

    return { status, content };
  }
}

class CelebrateErrorHandler {
  static formatResponse(error: CelebrateError): ApiErrorResponse {
    const status = 400;

    let segment = "";
    for (const entry of error.details.entries()) {
      segment = entry[0];
      break;
    }

    const message = error.details.get(segment)?.message ?? "";

    const content = {
      code: "validation_error",
      message,
    };

    return { status, content };
  }
}

class ServerErrorHandler {
  static formatResponse(error: any): ApiErrorResponse {
    const status = 500;

    const message = error instanceof Error ? error.message : String(error);

    const content = {
      code: "internal_server_error",
      message,
    };

    return { status, content };
  }
}
