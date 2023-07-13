import { NextFunction, Request, Response } from "express";
import { Logger } from "winston";
import { NewAppError } from "./types";
import AppError from "./AppError.js";

const showErrMsg = (err: NewAppError, logger?: Logger) => {
  const errMsg = `💥 ${err.stack || err}`;
  logger ? logger.error(errMsg) : console.error(errMsg);
};

const sendErrorDev = (err: NewAppError, res: Response, logger?: Logger) => {
  showErrMsg(err, logger);
  return res.status(err.statusCode).json({
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (
  err: NewAppError,
  req: Request,
  res: Response,
  logger?: Logger
) => {
  if (req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        statusCode: err.statusCode,
      });
    }

    showErrMsg(err, logger);
    return res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
      statusCode: 500,
    });
  }
  if (err.isOperational) {
    return res.status(err.statusCode).render("error", {
      title: "Something went wrong!",
      msg: err.message,
      statusCode: err.statusCode,
    });
  }

  showErrMsg(err, logger);
  return res.status(err.statusCode).render("error", {
    title: "Something went wrong!",
    msg: "Please try again later.",
    statusCode: err.statusCode,
  });
};

const handleCastErrorDB = (err: NewAppError) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleGlobalErrors = (logger?: Logger) => {
  return (err: NewAppError, req: Request, res: Response, _: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    if (process.env.NODE_ENV === "production") {
      let error = { ...err };
      error.message = err.message;
      if (error.name === "CastError") error = handleCastErrorDB(error);
      sendErrorProd(error, req, res, logger);
    } else {
      sendErrorDev(err, res, logger);
    }
  };
};

export default handleGlobalErrors;
