import { Response } from "express";
import { RequestWithBody } from "../../../core/types/request-general.type";
import { PostViewModel } from "../../types/model/post-view.model";
import { PostsType } from "../../types/posts.type";
import { ErrorsResponse } from "../../../core/types/error.type";
import { postsRepository } from "../../repositories/posts.repository";
import { db } from "../../../db/db";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { createErrorMessage } from "../../../core/middleware/validation/input-validation.middleware";
import { errorMessage } from "../../../core/utils/errorMessage.utils";
import { blogsRepository } from "../../../blogs/repositories/blogs.repository";
import { BlogsType } from "../../../blogs/types/blogs.type";

export const createPostHandler = (
  req: RequestWithBody<PostViewModel>,
  res: Response<PostsType | ErrorsResponse>,
) => {
  const { body } = req;

  const id: string = String(
    db.posts.length ? +db.posts[db.posts.length - 1].id + 1 : 1,
  );

  const findBlog: BlogsType | null = blogsRepository.getById(body.blogId);

  if (!findBlog) {
    res.status(HTTP_STATUS.NOT_FOUND_404).send(
      createErrorMessage([
        {
          field: "id",
          message: errorMessage.notFound("id", "blog"),
        },
      ]),
    );
    return;
  }

  const newPost: PostsType = {
    id: id,
    blogName: findBlog.name,
    ...body,
  };

  postsRepository.create(newPost);

  res.sendStatus(HTTP_STATUS.CREATED_201);
};
