import type { Request, Response } from 'express';
import * as service from './posts.service';
import * as schema from './posts.schema';

export async function getPosts(req: Request, res: Response) {
  const { term } = schema.getPostsQuerySchema.parse(req.query);

  const posts = service.getPosts(term);

  const result = {
    success: true,
    data: posts,
    error: null,
  };

  res.status(200).json(result);
}

export async function getPostById(req: Request, res: Response) {
  const { id } = schema.postParamsSchema.parse(req.params);

  const post = service.getPostById(id);

  const result = {
    success: true,
    data: post,
    error: null,
  };

  res.status(200).json(result);
}

export async function createPost(req: Request, res: Response) {
  const dataPost = schema.createPostSchema.parse(req.body);

  const post = service.createPost(dataPost);

  res.status(201).json({
    success: true,
    data: post,
    error: null,
  });
}

export async function updatePost(req: Request, res: Response) {
  const { id } = schema.postParamsSchema.parse(req.params);

  const dataPost = schema.updatePostSchema.parse(req.body);

  const updatedPost = service.updatePost(id, dataPost);

  res.status(200).json({
    success: true,
    data: updatedPost,
    error: null,
  });
}

export async function deletePost(req: Request, res: Response) {
  const { id } = schema.postParamsSchema.parse(req.params);

  service.deletePost(id);

  res.status(204).end();
}
