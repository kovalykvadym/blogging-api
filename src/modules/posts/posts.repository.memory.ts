import type { Post } from './posts.types';
import type { PostsRepository } from './posts.repository';

let posts: Post[] = [];

export const postsRepository: PostsRepository = {
  findAll() {
    return posts;
  },
  findById(id: number) {
    return posts.find((p) => p.id === id) ?? null;
  },
  createPost(post: Post) {
    posts.push(post);
    return post;
  },
  updatePost(post: Post) {
    const index = posts.findIndex((p) => p.id === post.id);
    if (index === -1) {
      return null;
    }

    posts[index] = post;
    return post;
  },
  deletePost(id: number) {
    const post = posts.find((p) => p.id === id);
    if (!post) {
      return null;
    }

    posts = posts.filter((p) => p.id !== id);
    return post;
  },
};
