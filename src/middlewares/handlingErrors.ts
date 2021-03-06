import { NextFunction, Request, Response } from "express";

import { AppError } from "../domain/errors/appError";

export function handlingErrors(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
): Response {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      code: err.statusCode,
      message: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: `Internal server error: \n${err.message}`,
  });

  next();
}
