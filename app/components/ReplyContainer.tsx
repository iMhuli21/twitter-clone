import prisma from "../utils/Db";
import { IComment, IReply } from "../utils/constants";
import Comment from "./Comment";
import Reply from "./Reply";

interface props {
  reply: IReply;
}

export default async function ReplyContainer({ reply }: props) {
  const authorInformation = await prisma.user.findUnique({
    where: {
      id: reply.userId,
    },
  });

  if (!authorInformation) return "User does not exist";
  return <Reply author={authorInformation} reply={reply} />;
}
