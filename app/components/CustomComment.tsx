import Link from "next/link";
import prisma from "../utils/Db";
import { IComment, ISession } from "../utils/constants";
import { MdVerified } from "react-icons/md";
import { BsDot } from "react-icons/bs";
import { DateTime } from "luxon";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/Auth";
import CreateReply from "./CreateReply";
import ReplyContainer from "./ReplyContainer";
import Comments from "./Comments";
import Retweets from "./Retweets";
import Likes from "./Likes";
import lodash from "lodash";

interface props {
  comment: IComment;
}

export default async function CustomComment({ comment }: props) {
  let likesCount = "";
  let retweetsCount = "";
  let commentCount = "";
  const session = await getServerSession(authOptions);

  if (comment.likes) {
    likesCount =
      comment.likes.length > 999
        ? `${comment.likes.length}k`
        : `${comment.likes.length}`;
  }

  if (comment.retweets) {
    retweetsCount =
      comment.retweets.length > 999
        ? `${comment.retweets.length}k`
        : `${comment.retweets.length}`;
  }

  if (comment.replies) {
    commentCount =
      comment.replies.length > 999
        ? `${comment.replies.length}k`
        : `${comment.replies.length}`;
  }

  const authorInformation = await prisma.user.findUnique({
    where: {
      id: comment?.userId,
    },
  });

  const postDate = DateTime.fromISO(comment.createdAt.toISOString());

  const loggedInUser = await prisma.user.findUnique({
    where: {
      id: `${(session as ISession).user?.id}`,
    },
  });

  const alreadyRetweeted = lodash.find(comment.retweets, {
    userId: loggedInUser,
  });
  const alreadyLiked = lodash.find(comment.likes, { userId: loggedInUser });
  const alreadyCommented = lodash.find(comment.replies, {
    userId: loggedInUser,
  });

  if (!authorInformation) return "User does not exist";
  return (
    <div className="flex flex-col items-start w-full hover:cursor-pointer">
      <div className="w-full flex flex-col items-start gap-2 py-2 px-4 sm:px-6">
        <div className="flex items-center gap-2 w-full">
          <img
            src={authorInformation.photo}
            alt="user profile"
            loading="lazy"
            className="object-cover object-center w-12 h-12 rounded-full"
          />
          <Link href={`/profile/${authorInformation.username}`}>
            <h1 className="flex items-center gap-1">
              <span className="font-medium hover:border-b border-gray-500 transition">
                {authorInformation.headerTitle}
              </span>
              <MdVerified className="text-sky-700" />
            </h1>
          </Link>

          <div className="flex items-center gap-2 text-sm truncate">
            <span className="truncate">@{authorInformation.username}</span>
          </div>
        </div>

        <div className="flex flex-col items-start gap-2 w-full">
          <p className="w-full">{comment.body}</p>

          {comment.media.length !== 0 && (
            <div className="grid grid-cols-2 gap-4 rounded w-full place-content-between place-items-center">
              {comment.media.map((pic, i) => (
                <a
                  href={pic}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  key={i}
                >
                  <img
                    src={pic}
                    alt="picture"
                    loading="lazy"
                    className="object-cover object-center max-w-xs w-full rounded-xl hover:cursor-pointer"
                  />
                </a>
              ))}
            </div>
          )}

          <div className="flex items-center gap-1 text-sm text-gray-500 py-2">
            <span>{postDate.toLocaleString(DateTime.TIME_SIMPLE)}</span>
            <BsDot />
            <span>
              {postDate.monthShort} {postDate.day}, {postDate.year}
            </span>
          </div>
          <div className="flex items-center gap-2 justify-between w-full p-2 border-t border-b border-gray-600">
            <Comments
              count={commentCount}
              active={alreadyCommented ? true : false}
            />
            <Retweets
              count={retweetsCount}
              commentId={comment.id}
              commentAuthor={comment.userId}
              active={alreadyRetweeted ? true : false}
            />
            <Likes
              count={likesCount}
              commentId={comment.id}
              commentAuthor={comment.userId}
              active={alreadyLiked ? true : false}
            />
          </div>
        </div>
      </div>

      {loggedInUser && (
        <CreateReply
          photo={loggedInUser.photo}
          commentId={comment.id}
          userId={loggedInUser.id}
          commentor={comment.userId}
        />
      )}

      <div className="w-full">
        {comment?.replies?.map((reply) => (
          <ReplyContainer key={comment.id} reply={reply} />
        ))}
      </div>
    </div>
  );
}
