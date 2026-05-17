import type { Response } from 'express';
import type { Result } from '../result/result';
import { httpStatusByErrorType, type HttpError } from './http-status';

export function handleResult<T>(
  res: Response,
  result: Result<T, HttpError>,
  successCode = 200,
): Response {
  if (!result.success) {
    const status = httpStatusByErrorType[result.error.type];

    return res.status(status).json({
      success: false,
      data: null,
      error: result.error,
    });
  }

  return res.status(successCode).json({
    success: true,
    data: result.data,
    error: null,
  });
}
