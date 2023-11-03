"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsChevronRight } from "react-icons/bs";

export default function SignOut() {
  const router = useRouter();
  const [isPending, setPending] = useState(false);

  const handleSignOut = async () => {
    setPending(true);
    (document as any).getElementById("my_modal_7").close();
    await signOut();
    setPending(false);
    router.push("/home");
  };
  return (
    <>
      <div
        className="flex items-center w-full justify-between p-3
       hover:cursor-pointer hover:bg-neutral"
        onClick={() =>
          (document as any).getElementById("my_modal_7").showModal()
        }
      >
        <span>Sign out</span>
        <BsChevronRight />
      </div>

      <dialog id="my_modal_7" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 outline-none border-none">
              ✕
            </button>
          </form>
          <h2 className="font-extrabold text-xl">Sign Out?</h2>
          <p className="py-4">
            Are you sure you want to sign out and miss out the latest news?
          </p>
          <div className="flex items-center gap-2 mt-4">
            <button
              disabled={isPending}
              className="btn btn-warning disabled:bg-gray-500"
              onClick={handleSignOut}
            >
              Yes, I&apos;m sure
            </button>
            <button
              disabled={isPending}
              className="btn btn-neutral disabled:bg-gray-500"
              onClick={() =>
                (document as any).getElementById("my_modal_7").close()
              }
            >
              No, cancel
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
