import type { ZodType } from 'zod';
import { fail, ok, type Result } from '../result/result';

export interface ValidationError {
  type: 'VALIDATION_ERROR';
  message: string;
  fields: {
    field: string;
    message: string;
  }[];
}

export function safeParse<T>(schema: ZodType<T>, data: unknown): Result<T, ValidationError> {
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    return fail({
      type: 'VALIDATION_ERROR',
      message: 'Validation failed',
      fields: parsed.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  return ok(parsed.data);
}
