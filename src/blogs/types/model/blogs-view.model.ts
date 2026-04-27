import { BlogsType } from "../blogs.type";

export type BlogsViewModel = Omit<BlogsType, "id">;
