import { db } from "../../db/db";
import { PostsType } from "../types/posts.type";

export const postsRepository = {
  getAll: (): PostsType[] => db.posts,
  getById: (id: string): PostsType | null =>
    db.posts.find((post) => post.id === id) ?? null,
  create: (newPost: PostsType): PostsType => {
    db.posts.push(newPost);
    return newPost;
  },
  update: (
    id: string,
    updatePosts: Omit<PostsType, "id">,
  ): PostsType | null => {
    const findPosts: PostsType | null = postsRepository.getById(id);

    if (findPosts) {
      findPosts.title = updatePosts.title;
      findPosts.shortDescription = updatePosts.shortDescription;
      findPosts.content = updatePosts.content;
      findPosts.blogId = updatePosts.blogId;
      findPosts.blogName = updatePosts.blogName;
    }

    return findPosts;
  },
  delete: (id: string): boolean => {
    const findIndex = db.posts.findIndex((post) => post.id === id);

    if (findIndex === -1) {
      return false;
    }

    db.posts.splice(findIndex, 1);
    return true;
  },
};
