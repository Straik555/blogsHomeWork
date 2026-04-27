import { Request, Response } from "express";
import { PostsType } from "../../types/posts.type";
import { HTTP_STATUS } from "../../../core/types/http-status.type";
import { postsRepository } from "../../repositories/posts.repository";

export const getPostsListHandler = (
  req: Request,
  res: Response<PostsType[]>,
) => {
  const posts: PostsType[] = postsRepository.getAll();
  res.status(HTTP_STATUS.OK_200).send(posts);
};
