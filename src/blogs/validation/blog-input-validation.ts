import { body } from "express-validator";
import { errorMessage } from "../../core/utils/errorMessage.utils";

const websiteRegex =
  "^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$";

const nameValidation = body("name")
  .isString()
  .withMessage(errorMessage.isString("name"))
  .trim()
  .isLength({ min: 1, max: 15 })
  .withMessage(errorMessage.charactersLength("Name", 1, 15));

const descriptionValidation = body("description")
  .isString()
  .withMessage(errorMessage.isString("description"))
  .trim()
  .isLength({ min: 1, max: 500 })
  .withMessage(errorMessage.charactersLength("description", 1, 500));

const websiteUrlValidation = body("websiteUrl")
  .isString()
  .withMessage(errorMessage.isString("website url"))
  .trim()
  .matches(websiteRegex)
  .isLength({ min: 12, max: 100 })
  .withMessage(errorMessage.charactersLength("Website url", 12, 100));

export const blogInputValidation = [
  nameValidation,
  descriptionValidation,
  websiteUrlValidation,
];
