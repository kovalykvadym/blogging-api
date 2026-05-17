export type HttpError =
  | { type: 'NOT_FOUND' }
  | { type: 'BAD_REQUEST' }
  | { type: 'UNAUTHORIZED' }
  | { type: 'FORBIDDEN' }
  | { type: 'VALIDATION_ERROR' }
  | { type: 'INTERNAL_ERROR' };

export const httpStatusByErrorType: Record<HttpError['type'], number> = {
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  VALIDATION_ERROR: 422,
  INTERNAL_ERROR: 500,
};
