"use client";

import { useSession } from "next-auth/react";
import { AiOutlineHeart } from "react-icons/ai";
import {
  ICustomMessage,
  ISession,
  isCustomError,
  toastOptions,
} from "../utils/constants";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface props {
  count: string | undefined;
  postId?: string;
  postAuthor?: string;
  commentId?: string;
  commentAuthor?: string;
  active: boolean;
}

export default function Likes({
  count,
  postId,
  commentId,
  postAuthor,
  commentAuthor,
  active,
}: props) {
  const session = useSession();
  const router = useRouter();

  const likePost = async () => {
    const formData = new FormData();
    //get the userId
    const id = (session.data as ISession).user?.id as string;

    formData.set("id", id);

    //check if the user is liking a post or comment
    if (postId) {
      if (postAuthor) {
        formData.set("postId", postId);
        formData.set("postAuthor", postAuthor);

        const sendReq = await fetch("/api/like", {
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
        toast.error("No post author provided", toastOptions);
        return;
      }
    } else if (commentId) {
      if (commentAuthor) {
        formData.set("commentId", commentId);
        formData.set("commentAuthor", commentAuthor);

        const sendReq = await fetch("/api/like", {
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
        toast.error("No comment author provided", toastOptions);
        return;
      }
    }
  };

  return (
    <div className="flex items-center gap-2 hover:cursor-pointer hover:text-error transition">
      <AiOutlineHeart
        size={20}
        onClick={likePost}
        className={active ? "text-error" : "text-gray-300"}
      />

      <span className={active ? "text-error" : "text-gray-600"}>{count}</span>
    </div>
  );
}
