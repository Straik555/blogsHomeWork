import express, { Express, Request, Response } from "express";
import { ROUTER_PATH } from "./core/path/paths";
import { blogsRouter } from "./blogs/router/blogs.router";
import { testingRouter } from "./testing/router/testing.router";
import { postsRouter } from "./posts/router/posts.router";

const JSONBodyMiddleware = express.json();
export const setupApp = (app: Express) => {
  app.use(JSONBodyMiddleware);

  app.get("/", (req: Request, res: Response) => {
    res.send("BackEnd Incubator");
  });

  app.use(ROUTER_PATH.blogs, blogsRouter);
  app.use(ROUTER_PATH.posts, postsRouter);
  app.use(ROUTER_PATH.testing, testingRouter);

  return app;
};
