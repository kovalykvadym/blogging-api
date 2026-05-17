import type { PostError } from './posts.errors';
import generateId from '../../utils/id-generator';
import type { GetPostsQuery } from './posts.schema';
import { type Result, ok, fail } from '../../common/result/result';
import type { Post, CreatePostDTO, UpdatePostDTO, PostsListResult } from './posts.types';
import { postsRepository } from './posts.repository.memory';

export function getPosts(query: GetPostsQuery): Result<PostsListResult, PostError> {
  const { term, page, limit, sortBy, order } = query;

  let posts = postsRepository.findAll();

  if (term) {
    const normalized = term.toLowerCase().trim();

    posts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(normalized) ||
        post.content.toLowerCase().includes(normalized) ||
        post.category.toLowerCase().includes(normalized),
    );
  }

  posts = posts.sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    return order === 'asc' ? (aValue > bValue ? 1 : -1) : aValue < bValue ? 1 : -1;
  });

  const total = posts.length;

  const items = posts.slice((page - 1) * limit, page * limit);

  return ok({
    items,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}

export function getPostById(id: number): Result<Post, PostError> {
  const post = postsRepository.findById(id);

  if (!post) {
    return fail({
      type: 'NOT_FOUND',
      message: 'Post not found',
    });
  }

  return ok(post);
}

export function createPost(data: CreatePostDTO): Result<Post, PostError> {
  const posts = postsRepository.findAll();

  const id = generateId(posts);
  const now = new Date().toISOString();

  const post: Post = {
    id,
    ...data,
    createdAt: now,
    updatedAt: now,
  };

  const created = postsRepository.createPost(post);

  return ok(created);
}

export function updatePost(id: number, data: UpdatePostDTO): Result<Post, PostError> {
  const existing = postsRepository.findById(id);

  if (!existing) {
    return fail({
      type: 'NOT_FOUND',
      message: 'Post not found',
    });
  }

  const updated: Post = {
    ...existing,
    ...data,
    updatedAt: new Date().toISOString(),
  };

  const saved = postsRepository.updatePost(updated);

  if (!saved) {
    return fail({
      type: 'INTERNAL_ERROR',
      message: 'Unable to update post',
    });
  }

  return ok(saved);
}

export function deletePost(id: number): Result<Post, PostError> {
  const existing = postsRepository.findById(id);

  if (!existing) {
    return fail({
      type: 'NOT_FOUND',
      message: 'Post not found',
    });
  }

  const deleted = postsRepository.deletePost(id);

  if (!deleted) {
    return fail({
      type: 'INTERNAL_ERROR',
      message: 'Unable to delete post',
    });
  }

  return ok(deleted);
}
