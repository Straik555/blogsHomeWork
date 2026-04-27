import { Response } from "express";
import { RequestWithBody } from "../../../core/types/request-general.type";
import { BlogsViewModel } from "../../types/model/blogs-view.model";
import { BlogsType } from "../../types/blogs.type";
import { db } from "../../../db/db";
import { blogsRepository } from "../../repositories/blogs.repository";
import { HTTP_STATUS } from "../../../core/types/http-status.type";

export const createBlogHandler = (
  req: RequestWithBody<BlogsViewModel>,
  res: Response<BlogsType>,
) => {
  const { body } = req;

  const id: string = String(
    db.blogs.length ? +db.blogs[db.blogs.length - 1].id + 1 : 1,
  );

  const newBlog = {
    id,
    ...body,
  };

  blogsRepository.create(newBlog);
  res.status(HTTP_STATUS.CREATED_201).json(newBlog);
};
