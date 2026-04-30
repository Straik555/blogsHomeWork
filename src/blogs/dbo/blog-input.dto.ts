import { BlogsType } from "../types/blogs.type";

export type BlogInputDtoType = Omit<BlogsType, "createdAt" | "isMembership">;
