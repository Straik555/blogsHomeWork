import { Response } from "express";
import { RequestWithParamsAndBody } from "../../../core/types/request-general.type";
import { UriParamsById } from "../../../core/types/uri-params-by-id.type";
import { PostViewModel } from "../../types/model/post-view.model";
import { ErrorsResponse } from "../../../core/types/error.type";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { createErrorMessage } from "../../../core/middleware/validation/input-validation.middleware";
import { errorMessage } from "../../../core/utils/errorMessage.utils";
import { postsRepository } from "../../repositories/posts.repository";
import { blogsRepository } from "../../../blogs/repositories/blogs.repository";
import { WithId } from "mongodb";
import { BlogsType } from "../../../blogs/types/blogs.type";
import { PostInputDtoType } from "../../dto/post-input.dto";

export const updatePostByIdHandler = async (
  req: RequestWithParamsAndBody<UriParamsById, PostInputDtoType>,
  res: Response<PostViewModel | ErrorsResponse>,
) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const foundBlog: WithId<BlogsType> | null = await blogsRepository.getById(
      body.blogId,
    );

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

    await postsRepository.update(id, body);

    res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
  } catch (error) {
    res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
  }
};
