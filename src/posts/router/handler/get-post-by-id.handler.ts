import { Response } from "express";
import { RequestWithParams } from "../../../core/types/request-general.type";
import { UriParamsById } from "../../../core/types/uri-params-by-id.type";
import { PostsType } from "../../types/posts.type";
import { ErrorsResponse } from "../../../core/types/error.type";
import { postsRepository } from "../../repositories/posts.repository";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { errorMessage } from "../../../core/utils/errorMessage.utils";
import { createErrorMessage } from "../../../core/middleware/validation/input-validation.middleware";
import { PostViewModel } from "../../types/model/post-view.model";
import { WithId } from "mongodb";
import { mapToPostViewModelUtil } from "../mappers/map-to-post-view-model.util";

export const getPostByIdHandler = async (
  req: RequestWithParams<UriParamsById>,
  res: Response<PostViewModel | ErrorsResponse>,
) => {
  try {
    const { id } = req.params;

    const foundPost: WithId<PostsType> | null =
      await postsRepository.getById(id);

    if (!foundPost) {
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

    const postResult = mapToPostViewModelUtil(foundPost);

    res.status(HTTP_STATUS.OK_200).send(postResult);
  } catch (error) {
    res.sendStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR_500);
  }
};
