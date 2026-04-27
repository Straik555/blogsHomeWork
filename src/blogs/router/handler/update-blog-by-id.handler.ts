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

export const updateBlogByIdHandler = (
  req: RequestWithParamsAndBody<UriParamsById, BlogsViewModel>,
  res: Response<BlogsType | ErrorsResponse>,
) => {
  const { id } = req.params;
  const { body } = req;

  const updateBlog: BlogsType | null = blogsRepository.update(id, body);
  if (!updateBlog) {
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
  res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
};
