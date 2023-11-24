import prisma from "../utils/Db";
import { IReply } from "../utils/constants";
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
