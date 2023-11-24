import prisma from "../utils/Db";
import CommentContainer from "./CommentContainer";

interface props {
  user: string;
}

export default async function CommentsTab({ user }: props) {
  const userComments = await prisma.comment.findMany({
    where: {
      user: {
        id: user,
      },
    },
    include: {
      replies: true,
      likes: true,
      retweets: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="w-full">
      {userComments.map((comment) => (
        <CommentContainer key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
