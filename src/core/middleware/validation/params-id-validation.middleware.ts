import { param } from "express-validator";

export const paramsIdValidationMiddleware = param("id")
  .exists()
  .withMessage("Id is required")
  .isString()
  .withMessage("Id must be a string")
  .trim()
  .isLength({ min: 1, max: 24 })
  .withMessage("Id must be between 1 and 24 characters");
