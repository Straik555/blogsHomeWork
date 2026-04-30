import { PostsType } from "../../types/posts.type";
import { WithId } from "mongodb";
import { PostViewModel } from "../../types/model/post-view.model";

export const mapToPostViewModelUtil = (
  post: WithId<PostsType>,
): PostViewModel => {
  return {
    id: post._id.toString(),
    shortDescription: post.shortDescription,
    title: post.title,
    isMembership: post.isMembership,
    createdAt: post.createdAt,
    content: post.content,
    blogId: post.blogId,
    blogName: post.blogName,
  };
};
