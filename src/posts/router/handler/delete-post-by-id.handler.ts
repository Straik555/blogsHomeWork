import { Response } from "express";
import { RequestWithParams } from "../../../core/types/request-general.type";
import { UriParamsById } from "../../../core/types/uri-params-by-id.type";
import { PostsType } from "../../types/posts.type";
import { ErrorsResponse } from "../../../core/types/error.type";
import { postsRepository } from "../../repositories/posts.repository";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { createErrorMessage } from "../../../core/middleware/validation/input-validation.middleware";
import { errorMessage } from "../../../core/utils/errorMessage.utils";

export const deletePostByIdHandler = (
  req: RequestWithParams<UriParamsById>,
  res: Response<PostsType | ErrorsResponse>,
) => {
  const { id } = req.params;

  const findPost: boolean = postsRepository.delete(id);

  if (!findPost) {
    res.status(HTTP_STATUS.NOT_FOUND_404).send(
      createErrorMessage([
        {
          message: errorMessage.notFound("id", "posts"),
          field: "id",
        },
      ]),
    );
    return;
  }

  res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
};
