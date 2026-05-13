import * as repository from './posts.repository';
import type { CreatePostDTO, Post, UpdatePostDTO } from './posts.types';
import AppError from '../../utils/errors/app-error';

export function getPosts(term?: string | undefined) {
  const posts = repository.findAll();

  if (!term) {
    return posts;
  }

  const normalizeTerm = term.toLowerCase().trim();
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(normalizeTerm) ||
      post.content.toLowerCase().includes(normalizeTerm) ||
      post.category.toLowerCase().includes(normalizeTerm),
  );
}

export function getPostById(id: number) {
  const post = repository.findById(id);

  if (post === null) {
    throw new AppError('Post not found', 404);
  }

  return post;
}

export function createPost(dataPost: CreatePostDTO) {
  const id = repository.generateId();
  const timestamp = new Date().toISOString();

  const post: Post = {
    id,
    ...dataPost,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  return repository.createPost(post);
}

export function updatePost(id: number, updateDataPost: UpdatePostDTO) {
  const post = repository.findById(id);

  if (post === null) {
    throw new AppError('Post not found', 404);
  }

  const updatedPost: Post = {
    ...post,
    ...updateDataPost,
    updatedAt: new Date().toISOString(),
  };

  return repository.updatePost(updatedPost);
}

export function deletePost(id: number) {
  const post = repository.findById(id);

  if (post === null) {
    throw new AppError('Post not found', 404);
  }

  return repository.deletePost(id);
}
