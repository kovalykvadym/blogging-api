export interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostDTO {
  title: string;
  content: string;
  category: string;
  tags: string[];
}

export interface UpdatePostDTO {
  title?: string;
  content?: string;
  category?: string;
  tags?: string[];
}
