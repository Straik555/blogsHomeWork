import { Request, Response } from "express";
import { blogsRepository } from "../../repositories/blogs.repository";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { BlogsViewModel } from "../../types/model/blogs-view.model";
import { mapToBlogViewModelUtil } from "../mappers/map-to-blog-view-model.util";

export const getBlogsListHandler = async (
  req: Request,
  res: Response<BlogsViewModel[]>,
) => {
  const blogsList = await blogsRepository.getAll();
  const blogsViewModel: BlogsViewModel[] = blogsList.map((blog) =>
    mapToBlogViewModelUtil(blog),
  );

  res.status(HTTP_STATUS.OK_200).send(blogsViewModel);
};
