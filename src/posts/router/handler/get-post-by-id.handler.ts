import { Response } from "express";
import { RequestWithParams } from "../../../core/types/request-general.type";
import { UriParamsById } from "../../../core/types/uri-params-by-id.type";
import { PostsType } from "../../types/posts.type";
import { ErrorsResponse } from "../../../core/types/error.type";
import { postsRepository } from "../../repositories/posts.repository";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { errorMessage } from "../../../core/utils/errorMessage.utils";
import { createErrorMessage } from "../../../core/middleware/validation/input-validation.middleware";

export const getPostByIdHandler = (
  req: RequestWithParams<UriParamsById>,
  res: Response<PostsType | ErrorsResponse>,
) => {
  const { id } = req.params;
  const findPost: PostsType | null = postsRepository.getById(id);

  if (!findPost) {
    res.status(HTTP_STATUS.NOT_FOUND_404).send(
      createErrorMessage([
        {
          message: errorMessage.notFound("id", "post"),
          field: "id",
        },
      ]),
    );
    return;
  }

  res.status(HTTP_STATUS.OK_200).send(findPost);
};
