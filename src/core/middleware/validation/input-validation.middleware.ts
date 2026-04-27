import { ErrorsResponse, ErrorType } from "../../types/error.type";
import {
  FieldValidationError,
  ValidationError,
  validationResult,
} from "express-validator";
import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../../types/http-status.type";

const createErrorMessage = (error: ErrorType[]): ErrorsResponse => ({
  errorsMessages: error,
});

const formatError = (error: ValidationError): ErrorType => {
  const expressError = error as unknown as FieldValidationError;
  return {
    message: expressError.msg,
    field: expressError.path,
  };
};

const inputValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const error = validationResult(req)
    .formatWith(formatError)
    .array({ onlyFirstError: true });

  if (error.length) {
    res.status(HTTP_STATUS.BAD_REQUEST_400).send({
      errorsMessages: error,
    });
    return;
  }
  next();
  return;
};

export { inputValidationMiddleware, createErrorMessage };
