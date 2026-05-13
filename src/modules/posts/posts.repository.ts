import type { Post } from './posts.types';

let posts: Post[] = [];

export const generateId = (): number => {
  if (posts.length === 0) {
    return 1;
  }

  const ids = posts.map((post) => {
    return post.id;
  });

  return Math.max(...ids) + 1;
};

export function createPost(post: Post) {
  posts.push(post);
  return post;
}

export function findAll() {
  return posts;
}

export function findById(id: number) {
  return posts.find((post) => post.id === id) || null;
}

export function updatePost(updatedPost: Post) {
  const postIndex = posts.findIndex((post) => post.id === updatedPost.id);

  if (postIndex !== -1) {
    posts[postIndex] = updatedPost;

    return updatedPost;
  }

  return null;
}

export function deletePost(id: number) {
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex !== -1) {
    const post = posts[postIndex];

    posts = posts.filter((post) => post.id !== id);

    return post;
  }

  return null;
}
