import { Request, Response } from "express";
import { BlogsType } from "../../types/blogs.type";
import { blogsRepository } from "../../repositories/blogs.repository";
import { HTTP_STATUS } from "../../../core/types/http-status.type";

export const getBlogsListHandler = (
  req: Request,
  res: Response<BlogsType[]>,
) => {
  const blogs: BlogsType[] = blogsRepository.getAll();

  res.status(HTTP_STATUS.OK_200).send(blogs);
};
