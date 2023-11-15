import prisma from "../utils/Db";
import { IComment } from "../utils/constants";
import Comment from "./Comment";

interface props {
  comment: IComment;
}

export default async function CommentContainer({ comment }: props) {
  const authorInformation = await prisma.user.findUnique({
    where: {
      id: comment.userId,
    },
  });

  if (!authorInformation) return "User does not exist";
  return <Comment author={authorInformation} comment={comment} />;
}
