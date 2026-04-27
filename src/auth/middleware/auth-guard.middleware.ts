import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../../core/types/http-status.type";

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization as string;

  if (!authHeader) {
    res.sendStatus(HTTP_STATUS.UNAUTHORIZED_401);
    return;
  }

  const [authType, token] = authHeader.split(" ");

  if (authType !== "Basic") {
    res.sendStatus(HTTP_STATUS.UNAUTHORIZED_401);
    return;
  }

  const credential = Buffer.from(token, "base64").toString("utf-8");
  const [userName, password] = credential.split(":");

  if (userName !== "admin" || password !== "qwerty") {
    res.sendStatus(HTTP_STATUS.UNAUTHORIZED_401);
    return;
  }

  next();
};
