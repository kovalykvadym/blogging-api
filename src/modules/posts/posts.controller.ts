import type { Request, Response, NextFunction } from 'express';
import * as service from './posts.service';
import AppError from '../../utils/errors/app-error';
import type { CreatePostDTO, UpdatePostDTO } from './posts.types';

export async function getPosts(req: Request, res: Response, _next: NextFunction) {
  const term = typeof req.query.term === 'string' ? req.query.term : undefined;

  const posts = service.getPosts(term);

  const result = {
    success: true,
    data: posts,
    error: null,
  };

  res.status(200).json(result);
}

export async function getPostById(req: Request, res: Response, _next: NextFunction) {
  const id = Number.parseInt(req.params.id, 10); // Прибереться після додавання Zod

  if (Number.isNaN(id)) {
    throw new AppError('Invalid post id', 400);
  }

  const post = service.getPostById(id);

  const result = {
    success: true,
    data: post,
    error: null,
  };

  res.status(200).json(result);
}

export async function createPost(req: Request, res: Response, _next: NextFunction) {
  const body = req.body;

  const title = body.title;

  if (!title) {
    throw new AppError('Parameter title is required', 422);
  }

  const content = body.content;

  if (!content) {
    throw new AppError('Parameter content is required', 422);
  }

  const category = body.category;

  if (!category) {
    throw new AppError('Parameter category is required', 422);
  }

  const tags = body.tags;

  if (!Array.isArray(tags)) {
    throw new AppError('Parameter must be Array', 422);
  }

  const dataPost: CreatePostDTO = {
    title: body.title,
    content: body.content,
    category: body.category,
    tags: body.tags,
  };

  const post = service.createPost(dataPost);

  const result = {
    success: true,
    data: post,
    error: null,
  };

  res.status(201).json(result);
}

export async function updatePost(req: Request, res: Response, _next: NextFunction) {
  const id = Number.parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    throw new AppError('Invalid post id', 400);
  }

  const body = req.body;
  const dataPost: UpdatePostDTO = {};

  if (body.title !== undefined) dataPost.title = body.title;
  if (body.content !== undefined) dataPost.content = body.content;
  if (body.category !== undefined) dataPost.category = body.category;
  if (body.tags !== undefined) dataPost.tags = body.tags;

  const updatedPost = service.updatePost(id, dataPost);

  res.status(200).json({
    success: true,
    data: updatedPost,
    error: null,
  });
}

export async function deletePost(req: Request, res: Response, _next: NextFunction) {
  const id = Number.parseInt(req.params.id, 10); // Прибереться після додавання Zod

  if (Number.isNaN(id)) {
    throw new AppError('Invalid post id', 400);
  }

  service.deletePost(id);

  res.status(204).end();
}
