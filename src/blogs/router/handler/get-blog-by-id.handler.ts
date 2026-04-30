import { Response } from "express";
import { RequestWithParams } from "../../../core/types/request-general.type";
import { UriParamsById } from "../../../core/types/uri-params-by-id.type";
import { blogsRepository } from "../../repositories/blogs.repository";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { createErrorMessage } from "../../../core/middleware/validation/input-validation.middleware";
import { ErrorsResponse } from "../../../core/types/error.type";
import { errorMessage } from "../../../core/utils/errorMessage.utils";
import { BlogsViewModel } from "../../types/model/blogs-view.model";
import { mapToBlogViewModelUtil } from "../mappers/map-to-blog-view-model.util";

export const getBlogByIdHandler = async (
  req: RequestWithParams<UriParamsById>,
  res: Response<BlogsViewModel | ErrorsResponse>,
) => {
  try {
    const { id } = req.params;
    const foundBlog = await blogsRepository.getById(id);

    if (!foundBlog) {
      res.status(HTTP_STATUS.NOT_FOUND_404).send(
        createErrorMessage([
          {
            message: errorMessage.notFound("id", "id"),
            field: "id",
          },
        ]),
      );
      return;
    }
    const blogResult = mapToBlogViewModelUtil(foundBlog);
    res.status(HTTP_STATUS.OK_200).send(blogResult);
  } catch (error) {
    res.sendStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR_500);
  }
};
