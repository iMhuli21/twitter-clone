import prisma from "../utils/Db";
import lodash from "lodash";
import PostContainer from "./PostContainer";
import CommentContainer from "./CommentContainer";

interface props {
  user: string;
}

export default async function LikesTab({ user }: props) {
  const posts = await prisma.post.findMany({
    include: {
      retweets: true,
      likes: true,
      comments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const comments = await prisma.comment.findMany({
    include: {
      retweets: true,
      likes: true,
      replies: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const userPostLikes = posts.filter((post) =>
    lodash.find(post.likes, { userId: user })
  );

  const userCommentLikes = comments.filter((comment) =>
    lodash.find(comment.likes, { userId: user })
  );
  return (
    <div className="w-full flex flex-col">
      <div className="w-full">
        {userPostLikes.map((post) => (
          <PostContainer key={post.id} post={post} />
        ))}
      </div>
      <div className="w-full">
        {userCommentLikes.map((comment) => (
          <CommentContainer key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
