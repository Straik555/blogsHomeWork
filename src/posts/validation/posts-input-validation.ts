import { body } from "express-validator";
import { errorMessage } from "../../core/utils/errorMessage.utils";

const titleValidation = body("title")
  .isString()
  .withMessage(errorMessage.isString("title"))
  .trim()
  .isLength({ min: 1, max: 30 })
  .withMessage(errorMessage.charactersLength("title", 1, 30));

const shortDescriptionValidation = body("shortDescription")
  .isString()
  .withMessage(errorMessage.isString("shortDescription"))
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage(errorMessage.charactersLength("shortDescription", 1, 100));

const contentValidation = body("content")
  .isString()
  .withMessage(errorMessage.isString("content"))
  .trim()
  .isLength({ min: 1, max: 1000 })
  .withMessage(errorMessage.charactersLength("content", 1, 1000));

const blogIdValidation = body("blogId")
  .isString()
  .withMessage(errorMessage.isRequired("blogId"));

export const postsInputValidation = [
  titleValidation,
  shortDescriptionValidation,
  contentValidation,
  blogIdValidation,
];
