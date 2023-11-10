import prisma from "../utils/Db";
import PostContainer from "./PostContainer";

export default async function Content() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div>
      {posts.map((post) => (
        <PostContainer key={post.id} post={post} />
      ))}
    </div>
  );
}
