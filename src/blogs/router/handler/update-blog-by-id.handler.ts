import { Response } from "express";
import { RequestWithParamsAndBody } from "../../../core/types/request-general.type";
import { UriParamsById } from "../../../core/types/uri-params-by-id.type";
import { BlogsViewModel } from "../../types/model/blogs-view.model";
import { ErrorsResponse } from "../../../core/types/error.type";
import { BlogsType } from "../../types/blogs.type";
import { blogsRepository } from "../../repositories/blogs.repository";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { createErrorMessage } from "../../../core/middleware/validation/input-validation.middleware";
import { errorMessage } from "../../../core/utils/errorMessage.utils";

export const updateBlogByIdHandler = async (
  req: RequestWithParamsAndBody<UriParamsById, BlogsType>,
  res: Response<BlogsViewModel | ErrorsResponse>,
) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const foundBlog = await blogsRepository.getById(id);

    if (!foundBlog) {
      res.status(HTTP_STATUS.NOT_FOUND_404).send(
        createErrorMessage([
          {
            message: errorMessage.notFound("id", "blog"),
            field: "id",
          },
        ]),
      );
      return;
    }

    await blogsRepository.update(id, body);
    res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
  } catch (error) {
    res.sendStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR_500);
  }
};
