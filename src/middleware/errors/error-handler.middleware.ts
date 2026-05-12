import type { Request, Response, NextFunction } from 'express';
import AppError from '../../utils/errors/app-error';

function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  const status = error instanceof AppError ? error.statusCode : 500;
  const message = error instanceof AppError ? error.message : 'Unknown error';

  res.status(status).json({
    success: false,
    data: null,
    error: {
      message,
    },
  });
}

export default errorHandler;
