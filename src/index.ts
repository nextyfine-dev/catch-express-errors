import { Request, Response, NextFunction } from "express";
import { Logger } from "winston";

export interface Err extends Error {
  message: string;
  statusCode: number;
  status: string;
  isOperational?: boolean;
  code?: string | number;
  name: string;
  details?: any;
  path?: string;
  value?: any;
}

export class AppError implements Err {
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
    this.statusCode = statusCode ?? 400;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.name = name ?? "App Error";
    this.code = code;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

const showErrMsg = (err: Err, logger?: Logger | null) => {
  const errMsg = `💥 ${
    err.stack ?? (typeof err === "string" ? err : JSON.stringify(err))
  }`;
  logger ? logger.log("error", err) : console.error(errMsg);
};

export const handleGlobalErrors = (
  logger?: Logger | null,
  isProduction = false
) => {
  return (err: Err, __: Request, res: Response, _: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    showErrMsg(err, logger);

    if (!isProduction)
      return res.status(err.statusCode).json({
        error: err,
        stack: err.stack,
      });

    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        statusCode: err.statusCode,
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
      statusCode: 500,
    });
  };
};
