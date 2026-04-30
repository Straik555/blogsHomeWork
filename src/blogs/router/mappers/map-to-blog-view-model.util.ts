import { WithId } from "mongodb";
import { BlogsType } from "../../types/blogs.type";
import { BlogsViewModel } from "../../types/model/blogs-view.model";

export const mapToBlogViewModelUtil = (
  blog: WithId<BlogsType>,
): BlogsViewModel => {
  return {
    id: blog._id.toString(),
    name: blog.name,
    createdAt: blog.createdAt,
    isMembership: blog.isMembership,
    description: blog.description,
    websiteUrl: blog.websiteUrl,
  };
};
