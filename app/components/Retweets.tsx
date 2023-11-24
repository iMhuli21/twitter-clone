"use client";

import { AiOutlineRetweet } from "react-icons/ai";
import {
  ICustomMessage,
  ISession,
  isCustomError,
  toastOptions,
} from "../utils/constants";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface props {
  count: string | undefined;
  postId?: string;
  postAuthor?: string;
  commentId?: string;
  commentAuthor?: string;
  active: boolean;
}

export default function Retweets({
  count,
  postId,
  commentId,
  commentAuthor,
  postAuthor,
  active,
}: props) {
  const session = useSession();
  const router = useRouter();

  const retweetPost = async () => {
    const formData = new FormData();
    //get the userId
    const id = (session.data as ISession).user?.id as string;

    formData.set("id", id);

    //check if the user is liking a post or comment
    if (postId) {
      if (postAuthor) {
        formData.set("postId", postId);
        formData.set("postAuthor", postAuthor);

        const sendReq = await fetch("/api/retweet", {
          method: "POST",
          body: formData,
        });

        const sentRes = await sendReq.json();

        if (isCustomError(sentRes)) {
          toast.error(sentRes.error, toastOptions);
        } else {
          toast.success((sentRes as ICustomMessage).success, toastOptions);

          router.refresh();
        }
      } else {
        toast.error("No post author", toastOptions);
        return;
      }
    } else if (commentId) {
      if (commentAuthor) {
        formData.set("commentId", commentId);
        formData.set("commentAuthor", commentAuthor);

        const sendReq = await fetch("/api/retweet", {
          method: "POST",
          body: formData,
        });

        const sentRes = await sendReq.json();

        if (isCustomError(sentRes)) {
          toast.error(sentRes.error, toastOptions);
        } else {
          toast.success((sentRes as ICustomMessage).success, toastOptions);
          router.refresh();
        }
      } else {
        toast.error("No comment author", toastOptions);
        return;
      }
    }
  };
  return (
    <div className="flex items-center gap-2 hover:cursor-pointer hover:text-success transition">
      <AiOutlineRetweet
        size={20}
        onClick={retweetPost}
        className={active ? "text-green-600" : "text-gray-300"}
      />
      <span
        className={active ? "text-sm text-green-600" : "text-sm text-gray-600"}
      >
        {count}
      </span>
    </div>
  );
}
