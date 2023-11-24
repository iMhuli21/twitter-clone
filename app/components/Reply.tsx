"use client";

import { useRouter } from "next/navigation";
import { IReply, IUser, formatTimeAgo } from "../utils/constants";
import Link from "next/link";
import { MdVerified } from "react-icons/md";
import { BsDot } from "react-icons/bs";
import DeleteBtn from "./DeleteBtn";

interface props {
  reply: IReply;
  author: IUser;
}

export default function Reply({ reply, author }: props) {
  const router = useRouter();

  return (
    <div className="flex items-start gap-3 py-2 px-4 sm:px-6 border-b border-gray-600 w-full hover:cursor-pointer hover:bg-neutral transition">
      <img
        src={author.photo}
        alt="user profile"
        loading="lazy"
        className="object-cover object-center w-12 h-12 rounded-full"
      />
      <div className="w-full flex flex-col items-start gap-2">
        <div className="flex items-start gap-2 w-full justify-between">
          <div className="flex flex-col sm:flex-row items-start gap-2 w-full">
            <Link href={`/profile/${author.username}`}>
              <h1 className="flex items-center gap-1">
                <span className="font-medium hover:border-b border-gray-500 transition">
                  {author.headerTitle}
                </span>
                <MdVerified className="text-sky-700" />
              </h1>
            </Link>

            <div className="flex items-center gap-2 text-sm">
              <span>@{author.username}</span>
              <div className="flex items-center">
                <BsDot />
                <span className="hidden sm:block">
                  {formatTimeAgo(reply.createdAt)}
                </span>
              </div>
            </div>
          </div>
          <DeleteBtn authorId={reply.userId} replyId={reply.id} />
        </div>

        <div className="flex flex-col items-start gap-2 w-full">
          <p className="w-full">{reply.body}</p>

          {reply.media.length !== 0 && (
            <div className="grid grid-cols-2 gap-4 rounded w-full place-content-between place-items-center">
              {reply.media.map((pic, i) => (
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
        </div>
      </div>
    </div>
  );
}
