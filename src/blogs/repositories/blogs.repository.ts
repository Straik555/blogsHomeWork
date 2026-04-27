import { BlogsType } from "../types/blogs.type";
import { db } from "../../db/db";
import { BlogsViewModel } from "../types/model/blogs-view.model";

export const blogsRepository = {
  getAll: (): BlogsType[] => db.blogs,
  getById: (id: string): BlogsType | null =>
    db.blogs.find((blog) => blog.id === id) ?? null,
  create: (blog: BlogsType): BlogsType => {
    db.blogs.push(blog);
    return blog;
  },
  update: (id: string, updateBlog: BlogsViewModel): BlogsType | null => {
    const findBlog: BlogsType | null = blogsRepository.getById(id);

    if (findBlog) {
      findBlog.name = updateBlog.name;
      findBlog.description = updateBlog.description;
      findBlog.websiteUrl = updateBlog.websiteUrl;
    }
    return findBlog;
  },
  delete: (id: string): boolean => {
    const findIndex = db.blogs.findIndex((blog) => blog.id === id);

    if (findIndex === -1) {
      return false;
    }
    db.blogs.splice(findIndex, 1);
    return true;
  },
};
