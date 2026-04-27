import { Request, Response, Router } from "express";
import { db } from "../../db/db";
import { HTTP_STATUS } from "../../core/types/http-status.type";

export const testingRouter = Router();

testingRouter.delete("/", (req: Request, res: Response) => {
  db.blogs = [];
  db.posts = [];
  res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
});
