import { Response } from "express";
import { RequestWithParamsAndBody } from "../../../core/types/request-general.type";
import { UriParamsById } from "../../../core/types/uri-params-by-id.type";
import { PostViewModel } from "../../types/model/post-view.model";
import { PostsType } from "../../types/posts.type";
import { ErrorsResponse } from "../../../core/types/error.type";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { createErrorMessage } from "../../../core/middleware/validation/input-validation.middleware";
import { errorMessage } from "../../../core/utils/errorMessage.utils";
import { postsRepository } from "../../repositories/posts.repository";
import { blogsRepository } from "../../../blogs/repositories/blogs.repository";
import { WithId } from "mongodb";
import { BlogsType } from "../../../blogs/types/blogs.type";

export const updatePostByIdHandler = async (
  req: RequestWithParamsAndBody<UriParamsById, PostViewModel>,
  res: Response<PostViewModel | ErrorsResponse>,
) => {
  console.log("req.body", req.body);
  try {
    const { id } = req.params;
    const { body } = req;

    const foundBlog: WithId<BlogsType> | null = await blogsRepository.getById(
      body.blogId,
    );

    if (!foundBlog) {
      res.status(HTTP_STATUS.NOT_FOUND_404).send(
        createErrorMessage([
          {
            field: "blogId",
            message: errorMessage.notFound("id", "blog"),
          },
        ]),
      );
      return;
    }
    const newPost: PostsType = {
      ...body,
      blogName: foundBlog.name,
    };

    const aaaa = await postsRepository.getById(id);
    console.log("aaaa", aaaa);

    await postsRepository.update(id, newPost);

    res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
  } catch (error) {
    if (error === "Post not found") {
      res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    }
    res.sendStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR_500);
  }
};
