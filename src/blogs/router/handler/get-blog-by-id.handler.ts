import { Response } from "express";
import { RequestWithParams } from "../../../core/types/request-general.type";
import { UriParamsById } from "../../../core/types/uri-params-by-id.type";
import { BlogsType } from "../../types/blogs.type";
import { blogsRepository } from "../../repositories/blogs.repository";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { createErrorMessage } from "../../../core/middleware/validation/input-validation.middleware";
import { ErrorsResponse } from "../../../core/types/error.type";
import { errorMessage } from "../../../core/utils/errorMessage.utils";

export const getBlogByIdHandler = (
  req: RequestWithParams<UriParamsById>,
  res: Response<BlogsType | ErrorsResponse>,
) => {
  const { id } = req.params;
  const foundBlog: BlogsType | null = blogsRepository.getById(id);

  if (!foundBlog || !id) {
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

  res.status(HTTP_STATUS.OK_200).send(foundBlog);
};
