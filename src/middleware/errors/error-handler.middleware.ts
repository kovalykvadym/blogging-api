import type { Request, Response, NextFunction } from 'express';

function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  console.error(error);

  res.status(500).json({
    success: false,
    data: null,
    error: {
      message: 'Internal server error',
    },
  });
}
export default errorHandler;
