import type { Post } from './posts.types';

export interface PostsRepository {
  findAll(): Post[];
  findById(id: number): Post | null;
  createPost(post: Post): Post;
  updatePost(post: Post): Post | null;
  deletePost(id: number): Post | null;
}
