export interface Success<T> {
  success: true;
  data: T;
}

export interface Fail<E> {
  success: false;
  error: E;
}

export type Result<T, E = unknown> = Success<T> | Fail<E>;

export function ok<T>(data: T): Success<T> {
  return {
    success: true,
    data,
  };
}

export function fail<E>(error: E): Fail<E> {
  return {
    success: false,
    error,
  };
}
