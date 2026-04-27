import { getBlogsListHandler } from "./handler/get-blogs-list.handler";
import { Router } from "express";
import { paramsIdValidationMiddleware } from "../../core/middleware/validation/params-id-validation.middleware";
import { getBlogByIdHandler } from "./handler/get-blog-by-id.handler";
import { inputValidationMiddleware } from "../../core/middleware/validation/input-validation.middleware";
import { blogInputValidation } from "../validation/blog-input-validation";
import { createBlogHandler } from "./handler/create-blog.handler";
import { updateBlogByIdHandler } from "./handler/update-blog-by-id.handler";
import { deleteBlogByIdHandler } from "./handler/delete-blog-by-id.handler";
import { authGuard } from "../../auth/middleware/auth-guard.middleware";

export const blogsRouter = Router();

blogsRouter.get("/", getBlogsListHandler);
blogsRouter.get(
  "/:id",
  paramsIdValidationMiddleware,
  inputValidationMiddleware,
  getBlogByIdHandler,
);

blogsRouter.post(
  "/",
  authGuard,
  blogInputValidation,
  inputValidationMiddleware,
  createBlogHandler,
);

blogsRouter.put(
  "/:id",
  authGuard,
  paramsIdValidationMiddleware,
  blogInputValidation,
  inputValidationMiddleware,
  updateBlogByIdHandler,
);

blogsRouter.delete(
  "/:id",
  authGuard,
  paramsIdValidationMiddleware,
  inputValidationMiddleware,
  deleteBlogByIdHandler,
);
