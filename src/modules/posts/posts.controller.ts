import type { Request, Response } from 'express';
import * as schema from './posts.schema';
import * as service from './posts.service';
import { safeParse } from '../../common/validation/safe-parse';
import { handleResult } from '../../common/http/handle-result';

export async function getPosts(req: Request, res: Response) {
  const queryResult = safeParse(schema.getPostsQuerySchema, req.query);
  if (!queryResult.success) {
    return handleResult(res, queryResult, 400);
  }

  const result = service.getPosts(queryResult.data);

  return handleResult(res, result, 200);
}

export async function getPostById(req: Request, res: Response) {
  const paramsResult = safeParse(schema.postParamsSchema, req.params);
  if (!paramsResult.success) {
    return handleResult(res, paramsResult, 400);
  }

  const result = service.getPostById(paramsResult.data.id);

  return handleResult(res, result, 200);
}

export async function createPost(req: Request, res: Response) {
  const bodyResult = safeParse(schema.createPostSchema, req.body);
  if (!bodyResult.success) {
    return handleResult(res, bodyResult, 400);
  }

  const result = service.createPost(bodyResult.data);

  return handleResult(res, result, 201);
}

export async function updatePost(req: Request, res: Response) {
  const paramsResult = safeParse(schema.postParamsSchema, req.params);
  if (!paramsResult.success) {
    return handleResult(res, paramsResult, 400);
  }

  const bodyResult = safeParse(schema.updatePostSchema, req.body);
  if (!bodyResult.success) {
    return handleResult(res, bodyResult, 400);
  }

  const result = service.updatePost(paramsResult.data.id, bodyResult.data);

  return handleResult(res, result, 200);
}

export async function deletePost(req: Request, res: Response) {
  const paramsResult = safeParse(schema.postParamsSchema, req.params);
  if (!paramsResult.success) {
    return handleResult(res, paramsResult, 400);
  }

  const result = service.deletePost(paramsResult.data.id);

  return handleResult(res, result, 200);
}
