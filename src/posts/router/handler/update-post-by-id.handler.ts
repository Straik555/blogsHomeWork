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

export const updatePostByIdHandler = async (
  req: RequestWithParamsAndBody<UriParamsById, PostViewModel>,
  res: Response<PostViewModel | ErrorsResponse>,
) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const foundBlog = await blogsRepository.getById(body.blogId);

    if (!foundBlog) {
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

    const newPost: PostsType = {
      ...body,
      blogName: foundBlog.name,
    };

    await postsRepository.update(id, newPost);

    res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
  } catch (error) {
    res.sendStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR_500);
  }
};
