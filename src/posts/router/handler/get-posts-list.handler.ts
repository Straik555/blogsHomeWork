import { Request, Response } from "express";
import { mapToPostViewModelUtil } from "../mappers/map-to-post-view-model.util";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { postsRepository } from "../../repositories/posts.repository";
import { PostViewModel } from "../../types/model/post-view.model";
import { PostsType } from "../../types/posts.type";
import { WithId } from "mongodb";

export const getPostsListHandler = async (
  req: Request,
  res: Response<PostViewModel[]>,
) => {
  const postList: WithId<PostsType>[] = await postsRepository.getAll();
  const postResult: PostViewModel[] = postList.map((post) =>
    mapToPostViewModelUtil(post),
  );

  res.status(HTTP_STATUS.OK_200).send(postResult);
};
