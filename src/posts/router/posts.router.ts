import { Router } from "express";
import { getPostsListHandler } from "./handler/get-posts-list.handler";
import { getPostByIdHandler } from "./handler/get-post-by-id.handler";
import { createPostHandler } from "./handler/create-post.handler";
import { updatePostByIdHandler } from "./handler/update-post-by-id.handler";
import { deletePostByIdHandler } from "./handler/delete-post-by-id.handler";
import { paramsIdValidationMiddleware } from "../../core/middleware/validation/params-id-validation.middleware";
import { inputValidationMiddleware } from "../../core/middleware/validation/input-validation.middleware";
import { authGuard } from "../../auth/middleware/auth-guard.middleware";
import { postsInputValidation } from "../validation/posts-input-validation";

export const postsRouter = Router();

postsRouter.get("/", getPostsListHandler);
postsRouter.get(
  "/:id",
  paramsIdValidationMiddleware,
  inputValidationMiddleware,
  getPostByIdHandler,
);

postsRouter.post(
  "/",
  authGuard,
  postsInputValidation,
  inputValidationMiddleware,
  createPostHandler,
);

postsRouter.put(
  "/:id",
  authGuard,
  paramsIdValidationMiddleware,
  postsInputValidation,
  inputValidationMiddleware,
  updatePostByIdHandler,
);

postsRouter.delete(
  "/:id",
  authGuard,
  paramsIdValidationMiddleware,
  inputValidationMiddleware,
  deletePostByIdHandler,
);
