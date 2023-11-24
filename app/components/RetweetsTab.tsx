import prisma from "../utils/Db";
import lodash from "lodash";
import PostContainer from "./PostContainer";
import CommentContainer from "./CommentContainer";

interface props {
  user: string;
}

export default async function RetweetsTab({ user }: props) {
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

  const userPostRetweets = posts.filter((post) =>
    lodash.find(post.retweets, { userId: user })
  );

  const userCommentRetweets = comments.filter((comment) =>
    lodash.find(comment.retweets, { userId: user })
  );

  return (
    <div className="w-full flex flex-col">
      <div className="w-full">
        {userPostRetweets.map((post) => (
          <PostContainer key={post.id} post={post} />
        ))}
      </div>
      <div className="w-full">
        {userCommentRetweets.map((comment) => (
          <CommentContainer key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
