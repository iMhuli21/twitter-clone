import prisma from "../utils/Db";
import PostContainer from "./PostContainer";

interface props {
  user: string;
}

export default async function PostTab({ user }: props) {
  const userPosts = await prisma.post.findMany({
    where: {
      author: {
        id: user,
      },
    },
    include: {
      comments: true,
      likes: true,
      retweets: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="w-full">
      {userPosts.map((post) => (
        <PostContainer key={post.id} post={post} />
      ))}
    </div>
  );
}
