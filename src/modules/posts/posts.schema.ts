import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  category: z.string().min(1),
  tags: z.array(z.string()).default([]),
});

export const updatePostSchema = z
  .object({
    title: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
    category: z.string().min(1).optional(),
    tags: z.array(z.string()).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field is required',
  });

export const postParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const getPostsQuerySchema = z.object({
  term: z.string().optional(),
});
