import { Request, Response, Router } from "express";
import { HTTP_STATUS } from "../../core/types/http-status.type";
import { blogsCollection, postsCollection } from "../../db/mongo.db";

export const testingRouter = Router();

testingRouter.delete("/", async (req: Request, res: Response) => {
  await blogsCollection.deleteMany({});
  await postsCollection.deleteMany({});
  res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
});
