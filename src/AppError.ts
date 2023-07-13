import { NewAppError } from "./types";

class AppError implements NewAppError {
  message: string;
  statusCode: number;
  status: string;
  isOperational: boolean;
  errName?: string;
  code?: string | number;
  name: string;
  details?: any;

  constructor(
    message: string,
    statusCode?: number,
    details?: any,
    name?: string,
    code?: string | number
  ) {
    this.message = message;
    this.statusCode = statusCode || 400;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.name = name || "App Error";
    this.code = code;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
