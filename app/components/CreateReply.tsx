"use client";

import { GoFileMedia } from "react-icons/go";
import { BsEmojiLaughing } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import EmojiPicker, { Theme, EmojiClickData } from "emoji-picker-react";
import { UploadFileResponse } from "uploadthing/client";
import { UploadButton } from "../utils/uploadthing";
import toast from "react-hot-toast";
import {
  ICustomMessage,
  isCustomError,
  toastOptions,
} from "../utils/constants";
import { useRouter } from "next/navigation";

interface props {
  userId: string | undefined;
  commentId: string | undefined;
  photo: string | undefined;
}

export default function CreateReply({ userId, commentId, photo }: props) {
  const router = useRouter();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [showEmojiMenu, setShowEmojiMenu] = useState(false);
  const [message, setMessage] = useState("");
  const [isPending, setPending] = useState(false);
  const [media, setMedia] = useState<UploadFileResponse[] | undefined>([]);

  const addEmojiToMessage = (emoji: EmojiClickData, event: MouseEvent) => {
    setMessage((curr) => `${curr}${emoji.emoji}`);
    setShowEmojiMenu(!showEmojiMenu);
  };

  const sendOutReply = async () => {
    setPending(true);
    const formData = new FormData();

    if (!commentId || !userId) {
      toast.error("No comment Id or userId", toastOptions);
      setPending(false);
      return;
    }

    if (media?.length !== 0) {
      media?.forEach((item) => {
        formData.append("media", item.url);
      });
    }

    if (message) {
      formData.set("message", message);
    }

    formData.set("userId", userId);
    formData.set("commentId", commentId);

    const sendReq = await fetch("/api/reply", {
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
    setPending(false);
    setMedia([]);
    setMessage("");
  };
  return (
    <div className="flex flex-col items-start justify-center w-full py-2 px-4 sm:px-6 border-b border-gray-600 hover:cursor-pointer">
      <div className="flex items-center gap-2 w-full justify-center">
        <img
          alt="user profile"
          src={photo}
          loading="lazy"
          className="object-cover object-center w-12 h-12 rounded-full"
        />
        <textarea
          ref={inputRef}
          name="reply"
          id="reply"
          placeholder="Post your reply"
          className="p-4 w-full bg-inherit min-h-16 placeholder:text-lg resize-none outline-none border-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>
      {media?.length !== 0 && (
        <div className="grid grid-flow-col border border-dashed rounded w-full place-content-between place-items-center border-spacing-10 border-gray-500">
          {media?.map((pic, i) => (
            <img
              key={i}
              src={pic.url}
              loading="lazy"
              alt="picture"
              className="object-cover object-center w-52 rounded h-36 hover:cursor-pointer"
              onClick={() =>
                setMedia((curr) => media.filter((item) => item !== pic))
              }
            />
          ))}
        </div>
      )}
      <div className="flex items-center justify-between w-full py-2">
        <div className="flex items-center text-sky-700">
          <div className="flex items-center p-2 justify-center w-10 h-10 hover:cursor-pointer hover:bg-sky-600 hover:bg-opacity-25 rounded-full transition ml-10">
            <UploadButton
              className="ut-allowed-content:hidden ut-button:bg-transparent ut-button:focus-within:ring-0 ut-button:focus-within:ring-offset-0"
              content={{
                button({ ready }) {
                  if (ready)
                    return (
                      <div className="flex items-center p-2 justify-center w-10 h-10 hover:cursor-pointer hover:bg-sky-600 hover:bg-opacity-25 rounded-full transition text-sky-700">
                        <GoFileMedia size={20} />
                      </div>
                    );
                },
              }}
              endpoint="media"
              onClientUploadComplete={(res) => {
                setMedia(res);
              }}
              onUploadError={(error: Error) => {
                toast.error(error.message, toastOptions);
              }}
            />
          </div>

          <div className="flex items-center p-2 justify-center w-10 h-10 hover:cursor-pointer hover:bg-sky-600 hover:bg-opacity-25 rounded-full transition relative">
            <BsEmojiLaughing
              size={20}
              onClick={() => setShowEmojiMenu(!showEmojiMenu)}
            />
            {showEmojiMenu && (
              <div className="absolute -left-20 top-14 sm:left-2 z-50">
                <EmojiPicker
                  theme={Theme.DARK}
                  onEmojiClick={addEmojiToMessage}
                />
              </div>
            )}
          </div>
        </div>
        <button
          disabled={isPending}
          className="btn btn-info text-white rounded-3xl normal-case w-32
           disabled:bg-gray-500"
          onClick={sendOutReply}
        >
          Reply
        </button>
      </div>
    </div>
  );
}
