"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { BsThreeDots } from "react-icons/bs";
import { useSession } from "next-auth/react";
import {
  ICustomMessage,
  ISession,
  isCustomError,
  toastOptions,
} from "../utils/constants";

interface props {
  authorId: string;
  commentId?: string | null;
  postId?: string | null;
  replyId?: string | null;
}

export default function DeleteBtn({
  authorId,
  commentId,
  postId,
  replyId,
}: props) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const session = useSession();
  const handleClick = async () => {
    if (!(session.data as ISession)?.user?.id) {
      toast.error("No auth id provided", toastOptions);
      return;
    }

    const formData = new FormData();

    formData.set("authUser", `${(session.data as ISession).user?.id}`);

    if (commentId) {
      formData.set("commentId", commentId);

      const sendReq = await fetch(`/api/comment`, {
        method: "DELETE",
        body: formData,
      });

      const sentRes = await sendReq.json();

      if (isCustomError(sentRes)) {
        toast.error(sentRes.error, toastOptions);
      } else {
        toast.success((sentRes as ICustomMessage).success, toastOptions);
        router.refresh();
      }
    } else if (replyId) {
      formData.set("replyId", replyId);

      const sendReq = await fetch(`/api/reply`, {
        method: "DELETE",
        body: formData,
      });

      const sentRes = await sendReq.json();

      if (isCustomError(sentRes)) {
        toast.error(sentRes.error, toastOptions);
      } else {
        toast.success((sentRes as ICustomMessage).success, toastOptions);
        router.refresh();
      }
    } else if (postId) {
      formData.set("postId", postId);

      const sendReq = await fetch(`/api/post`, {
        method: "DELETE",
        body: formData,
      });

      const sentRes = await sendReq.json();

      if (isCustomError(sentRes)) {
        toast.error(sentRes.error, toastOptions);
      } else {
        toast.success((sentRes as ICustomMessage).success, toastOptions);
        router.refresh();
      }
    }
  };
  //checks if the author of the post is the person who is logged in
  const correctUser =
    authorId === (session.data as ISession)?.user?.id ? true : false;

  return (
    <div
      className="flex items-center justify-center relative"
      onClick={() => setShowMenu(!showMenu)}
    >
      <BsThreeDots size={23} />

      {showMenu && correctUser && (
        <ul className="menu bg-base-200 w-56 rounded-box absolute z-50 top-8 right-0">
          <li onClick={handleClick}>
            <a>
              <FaTrash size={15} />
              Delete
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}
