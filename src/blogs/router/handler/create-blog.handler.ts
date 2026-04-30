import { Response } from "express";
import { RequestWithBody } from "../../../core/types/request-general.type";
import { BlogsViewModel } from "../../types/model/blogs-view.model";
import { BlogsType } from "../../types/blogs.type";
import { blogsRepository } from "../../repositories/blogs.repository";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { WithId } from "mongodb";
import { mapToBlogViewModelUtil } from "../mappers/map-to-blog-view-model.util";

export const createBlogHandler = async (
  req: RequestWithBody<BlogsType>,
  res: Response<BlogsViewModel>,
) => {
  try {
    const { body } = req;

    const blog: BlogsType = {
      websiteUrl: body.websiteUrl,
      name: body.name,
      description: body.description,
      createdAt: new Date().toDateString(),
      isMembership: false,
    };
    const newBlogCreated: WithId<BlogsType> =
      await blogsRepository.create(blog);

    const blogResult: BlogsViewModel = mapToBlogViewModelUtil(newBlogCreated);

    res.status(HTTP_STATUS.CREATED_201).json(blogResult);
  } catch (error) {
    res.sendStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR_500);
  }
};
