import type { NextFunction, Request, Response } from 'express';
import AppError from '../../utils/errors/app-error';
import { ZodError } from 'zod';

function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  const status =
    error instanceof AppError ? error.statusCode : error instanceof ZodError ? 422 : 500;
  const message =
    error instanceof AppError
      ? error.message
      : error instanceof ZodError
        ? 'Validation failed'
        : 'Unknown error';

  const fields =
    error instanceof ZodError
      ? error.issues.map((issue) => {
          return { field: issue.path.join(), message: issue.message };
        })
      : undefined;

  res.status(status).json({
    success: false,
    data: null,
    error: {
      message,
      fields,
    },
  });
}
export default errorHandler;
