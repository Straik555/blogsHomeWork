import { Response } from "express";
import { blogsRepository } from "../../repositories/blogs.repository";
import { RequestWithParams } from "../../../core/types/request-general.type";
import { UriParamsById } from "../../../core/types/uri-params-by-id.type";
import { BlogsType } from "../../types/blogs.type";
import { ErrorsResponse } from "../../../core/types/error.type";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { createErrorMessage } from "../../../core/middleware/validation/input-validation.middleware";
import { errorMessage } from "../../../core/utils/errorMessage.utils";
import { BlogsViewModel } from "../../types/model/blogs-view.model";
import { WithId } from "mongodb";

export const deleteBlogByIdHandler = async (
  req: RequestWithParams<UriParamsById>,
  res: Response<BlogsViewModel | ErrorsResponse>,
) => {
  try {
    const { id } = req.params;

    const foundBlog: WithId<BlogsType> | null =
      await blogsRepository.getById(id);

    if (!foundBlog) {
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
    await blogsRepository.delete(id);
    res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
  } catch (error) {
    res.sendStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR_500);
  }
};
