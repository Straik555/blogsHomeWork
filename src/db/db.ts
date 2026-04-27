import { BlogsType } from "../blogs/types/blogs.type";
import { PostsType } from "../posts/types/posts.type";

type DbType = {
  blogs: BlogsType[];
  posts: PostsType[];
};

export const db: DbType = {
  blogs: [
    {
      id: "1",
      name: "Oleg",
      description: "sdgtfyhijopl;[",
      websiteUrl:
        "https://4KN6LeG-nCCyFJaQonKSESHhuy_7Lnskx2_UY9OGHO4dLdzxg4raJv.-3jIMvuN71fY7fFGVRbCq89OSwSPofA7vaAef",
    },
    {
      id: "2",
      name: "Borys",
      description: "rftgyhuijkmlp-o09",
      websiteUrl:
        "https://4KN6LeG-nCCyFJaQonKSESHhuy_7Lnskx2_UY9OGHO4dLdzxg4raJv.-3jIMvuN71fY7fFGVRbCq89OSwSPofA7vaAef",
    },
  ],
  posts: [
    {
      id: "1",
      title: "string",
      shortDescription: "string",
      content: "string",
      blogId: "string",
      blogName: "string",
    },
  ],
};
