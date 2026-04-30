import { PostsType } from "../types/posts.type";
import { ObjectId, WithId } from "mongodb";
import { postsCollection } from "../../db/mongo.db";
import { PostInputDtoType } from "../dto/post-input.dto";

export const postsRepository = {
  getAll: async (): Promise<WithId<PostsType>[]> =>
    await postsCollection.find().toArray(),
  getById: async (id: string): Promise<WithId<PostsType> | null> =>
    (await postsCollection.findOne({ _id: new ObjectId(id) })) ?? null,
  create: async (newPost: PostsType): Promise<WithId<PostsType>> => {
    const insertResult = await postsCollection.insertOne(newPost);
    return {
      ...newPost,
      _id: insertResult.insertedId,
    };
  },
  update: async (id: string, updatePosts: PostInputDtoType): Promise<void> => {
    const updateResult = await postsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          blogId: updatePosts.blogId,
          content: updatePosts.content,
          title: updatePosts.title,
          shortDescription: updatePosts.shortDescription,
        },
      },
    );

    if (updateResult.matchedCount === 0) {
      throw new Error("Post not found");
    }
    return;
  },
  delete: async (id: string): Promise<void> => {
    const deleteResult = await postsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteResult.deletedCount === 0) {
      throw new Error("Post not found");
    }

    return;
  },
};
