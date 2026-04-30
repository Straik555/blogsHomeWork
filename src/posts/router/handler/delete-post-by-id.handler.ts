import { Response } from "express";
import { RequestWithParams } from "../../../core/types/request-general.type";
import { UriParamsById } from "../../../core/types/uri-params-by-id.type";
import { ErrorsResponse } from "../../../core/types/error.type";
import { postsRepository } from "../../repositories/posts.repository";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { createErrorMessage } from "../../../core/middleware/validation/input-validation.middleware";
import { errorMessage } from "../../../core/utils/errorMessage.utils";
import { PostViewModel } from "../../types/model/post-view.model";

export const deletePostByIdHandler = async (
  req: RequestWithParams<UriParamsById>,
  res: Response<PostViewModel | ErrorsResponse>,
) => {
  try {
    const { id } = req.params;

    const foundPost = await postsRepository.getById(id);

    if (!foundPost) {
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

    await postsRepository.delete(id);
    res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
  } catch (error) {
    res.sendStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR_500);
  }
};
