export type PostError =
  | { type: 'NOT_FOUND'; message: string }
  | { type: 'INTERNAL_ERROR'; message: string };
