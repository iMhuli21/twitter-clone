import prisma from "../utils/Db";
import ReplyContainer from "./ReplyContainer";

interface props {
  user: string;
}

export default async function RepliesTab({ user }: props) {
  const userReplies = await prisma.reply.findMany({
    where: {
      userId: user,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="w-full">
      {userReplies.map((reply) => (
        <ReplyContainer key={reply.id} reply={reply} />
      ))}
    </div>
  );
}
