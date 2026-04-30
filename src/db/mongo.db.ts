import { Collection, Db, MongoClient } from "mongodb";
import { BlogsType } from "../blogs/types/blogs.type";
import { SETTINGS } from "../core/settings/settings";
import { PostsType } from "../posts/types/posts.type";

const BLOGS_COLLECTION_NAME = "blogs";
const POSTS_COLLECTION_NAME = "posts";

let client: MongoClient;
let blogsCollection: Collection<BlogsType>;
let postsCollection: Collection<PostsType>;

const runDB = async (url: string) => {
  client = new MongoClient(url);
  const db: Db = client.db(SETTINGS.DB_NAME);

  blogsCollection = db.collection<BlogsType>(BLOGS_COLLECTION_NAME);
  postsCollection = db.collection<PostsType>(POSTS_COLLECTION_NAME);

  try {
    await client.connect();
    console.log("Connect to database successfully");
    await db.command({ ping: 1 });
  } catch (error) {
    await client.close();
    throw new Error(`Failed to connect to database: ${error}`);
  }
};

const stopDb = async () => {
  if (!client) {
    throw new Error("MongoDb connection error");
  }

  await client.close();
};

export { runDB, stopDb, blogsCollection, postsCollection };
