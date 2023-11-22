"use client";

import { RiQuillPenLine } from "react-icons/ri";
import { useRef, useState } from "react";
import { BsEmojiLaughing } from "react-icons/bs";
import { useRouter } from "next/navigation";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import toast from "react-hot-toast";
import { isCustomError, toastOptions } from "../utils/constants";
import { UploadFileResponse } from "uploadthing/client";
import { GoFileMedia } from "react-icons/go";
import { UploadButton } from "../utils/uploadthing";

interface props {
  author: string | null;
  authorPhoto: string;
}
export default function PopUpPost({ author, authorPhoto }: props) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isPending, setPending] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [showEmojiMenu, setShowEmojiMenu] = useState(false);
  const [media, setMedia] = useState<UploadFileResponse[] | undefined>([]);

  const addEmojiToMessage = (emoji: EmojiClickData, event: MouseEvent) => {
    setMessage((curr) => `${curr}${emoji.emoji}`);
    setShowEmojiMenu(!showEmojiMenu);
  };

  const sendOutPost = async () => {
    setPending(true);
    const formData = new FormData();

    if (!author) {
      toast.error("No Id", toastOptions);
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

    formData.set("id", author);

    const sendReq = await fetch("/api/post", {
      method: "POST",
      body: formData,
    });

    const sentRes = await sendReq.json();

    if (isCustomError(sentRes)) {
      toast.error(sentRes.error, toastOptions);
    } else {
      (document as any).getElementById("my_modal_20").close();
      toast.success("Sent!", toastOptions);
      router.refresh();
    }
    setPending(false);
    setMedia([]);
    setMessage("");
  };
  return (
    <>
      <button
        className="hidden lg:block btn btn-info text-white rounded-3xl w-40 mt-5"
        onClick={() =>
          (document as any).getElementById("my_modal_20").showModal()
        }
      >
        Post
      </button>
      <div
        className="flex mt-5 lg:hidden justify-center items-center w-14 h-14 rounded-full bg-info text-white"
        onClick={() =>
          (document as any).getElementById("my_modal_20").showModal()
        }
      >
        <RiQuillPenLine className="text-2xl" />
      </div>

      <dialog id="my_modal_20" className="modal">
        <div className="modal-box">
          <form method="dialog" className="flex items-center justify-between">
            <button className="btn btn-sm btn-circle text-xl btn-ghost absolute right-2 top-2 focus:border-none focus:outline-none">
              ✕
            </button>
          </form>

          <div className="flex flex-col items-start justify-center w-full py-2 border-b border-gray-600 hover:cursor-pointer">
            <div className="flex items-center gap-2 w-full justify-center">
              <img
                alt="user profile"
                src={authorPhoto}
                loading="lazy"
                className="object-cover object-center w-12 h-12 rounded-full"
              />
              <textarea
                ref={inputRef}
                name="post"
                id="post"
                placeholder="What is happening?!"
                className="p-4 w-full bg-inherit min-h-16 placeholder:text-lg resize-none outline-none border-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            {media?.length !== 0 && (
              <div className="grid grid-cols-2 gap-4 rounded w-full place-content-between place-items-center">
                {media?.map((pic, i) => (
                  <div className="relative flex basis-auto" key={i}>
                    <img
                      key={i}
                      src={pic.url}
                      loading="lazy"
                      alt="picture"
                      className="object-cover object-center max-w-xs w-full rounded-xl hover:cursor-pointer"
                    />
                    <div
                      className="w-10 h-10 p-2 rounded-full text-lg bg-base-200 flex items-center justify-center absolute -right-2 -top-2"
                      onClick={() =>
                        setMedia((curr) => media.filter((item) => item !== pic))
                      }
                    >
                      ✕
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center justify-between w-full py-2">
              <div className="flex items-center text-sky-700 w-full">
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
                className="btn btn-info text-white rounded-3xl normal-case w-32 disabled:bg-gray-500"
                onClick={sendOutPost}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
