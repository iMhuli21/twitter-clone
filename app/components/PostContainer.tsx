import prisma from "../utils/Db";
import { IPost } from "../utils/constants";
import Post from "./Post";

interface PostContainerProps {
  post: IPost;
}

export default async function PostContainer({ post }: PostContainerProps) {
  const authorInformation = await prisma.user.findUnique({
    where: {
      id: post.authorId,
    },
  });

  if (!authorInformation) return "User does not exist";

  return <Post author={authorInformation} post={post} />;
}
