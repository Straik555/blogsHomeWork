import { Response } from "express";
import { RequestWithBody } from "../../../core/types/request-general.type";
import { PostViewModel } from "../../types/model/post-view.model";
import { PostsType } from "../../types/posts.type";
import { ErrorsResponse } from "../../../core/types/error.type";
import { postsRepository } from "../../repositories/posts.repository";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { createErrorMessage } from "../../../core/middleware/validation/input-validation.middleware";
import { errorMessage } from "../../../core/utils/errorMessage.utils";
import { blogsRepository } from "../../../blogs/repositories/blogs.repository";
import { PostInputDtoType } from "../../dto/post-input.dto";
import { mapToPostViewModelUtil } from "../mappers/map-to-post-view-model.util";

export const createPostHandler = async (
  req: RequestWithBody<PostInputDtoType>,
  res: Response<PostViewModel | ErrorsResponse>,
) => {
  try {
    const { body } = req;

    const foundBlog = await blogsRepository.getById(body.blogId);
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

    const newPost: PostsType = {
      ...body,
      createdAt: new Date().toISOString(),
      blogName: foundBlog.name,
    };

    const newPostCreated = await postsRepository.create(newPost);

    const postResult = mapToPostViewModelUtil(newPostCreated);
    res.status(HTTP_STATUS.CREATED_201).json(postResult);
  } catch (error) {
    res.sendStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR_500);
  }
};
