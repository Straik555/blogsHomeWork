import { BlogsType } from "../types/blogs.type";
import { ObjectId, WithId } from "mongodb";
import { blogsCollection } from "../../db/mongo.db";
import { BlogInputDtoType } from "../dbo/blog-input.dto";

export const blogsRepository = {
  getAll: async (): Promise<WithId<BlogsType>[]> =>
    await blogsCollection.find().toArray(),
  getById: async (id: string): Promise<WithId<BlogsType> | null> =>
    (await blogsCollection.findOne({ _id: new ObjectId(id) })) ?? null,
  create: async (newBlog: BlogsType): Promise<WithId<BlogsType>> => {
    const insertResult = await blogsCollection.insertOne(newBlog);
    return {
      ...newBlog,
      _id: insertResult.insertedId,
    };
  },
  update: async (id: string, updateBlog: BlogInputDtoType): Promise<void> => {
    const updateResult = await blogsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: updateBlog.name,
          description: updateBlog.description,
          websiteUrl: updateBlog.websiteUrl,
        },
      },
    );

    if (updateResult.matchedCount === 0) {
      throw new Error("Blog not found");
    }
    return;
  },
  delete: async (id: string): Promise<void> => {
    const deleteResult = await blogsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteResult.deletedCount === 0) {
      throw new Error("Blog not found");
    }
    return;
  },
};
