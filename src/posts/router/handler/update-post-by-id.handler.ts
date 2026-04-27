import { Response } from "express";
import { RequestWithParamsAndBody } from "../../../core/types/request-general.type";
import { UriParamsById } from "../../../core/types/uri-params-by-id.type";
import { PostViewModel } from "../../types/model/post-view.model";
import { PostsType } from "../../types/posts.type";
import { ErrorsResponse } from "../../../core/types/error.type";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { createErrorMessage } from "../../../core/middleware/validation/input-validation.middleware";
import { errorMessage } from "../../../core/utils/errorMessage.utils";
import { postsRepository } from "../../repositories/posts.repository";
import { blogsRepository } from "../../../blogs/repositories/blogs.repository";
import { BlogsType } from "../../../blogs/types/blogs.type";

export const updatePostByIdHandler = (
  req: RequestWithParamsAndBody<UriParamsById, PostViewModel>,
  res: Response<PostsType | ErrorsResponse>,
) => {
  const { id } = req.params;
  const { body } = req;

  const findBlog: BlogsType | null = blogsRepository.getById(body.blogId);

  if (!findBlog) {
    res.status(HTTP_STATUS.NOT_FOUND_404).send(
      createErrorMessage([
        {
          field: "blogId",
          message: errorMessage.notFound("id", "blog"),
        },
      ]),
    );
    return;
  }

  const newPost: Omit<PostsType, "id"> = {
    ...body,
    blogName: findBlog.name,
    blogId: findBlog.id,
  };

  const updatePost: PostsType | null = postsRepository.update(id, newPost);

  if (!updatePost) {
    res.status(HTTP_STATUS.NOT_FOUND_404).send(
      createErrorMessage([
        {
          field: "id",
          message: errorMessage.notFound("id", "post"),
        },
      ]),
    );
    return;
  }

  res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
};
