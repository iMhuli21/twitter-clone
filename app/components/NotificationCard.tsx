"use client";

import { PiBellSimpleRingingFill } from "react-icons/pi";
import {
  INotifications,
  isCustomError,
  toastOptions,
} from "../utils/constants";
import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface props {
  noti: INotifications;
}

export default function NotificationCard({ noti }: props) {
  const router = useRouter();
  const splitString = noti.body.split(":");
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = async () => {
    const sendReq = await fetch(`/api/notification?id=${noti.id}`, {
      method: "PUT",
    });

    const sentRes = await sendReq.json();

    if (isCustomError(sentRes)) {
      toast.error(sentRes.error, toastOptions);
      return;
    } else {
      setShowMenu(!showMenu);
      router.refresh();
    }
  };
  return (
    <div
      className={
        noti.status === "seen"
          ? "flex items-center relative gap-2 w-full py-6 px-2 border-b border-gray-600 justify-between"
          : "flex items-center relative gap-2 w-full py-6 px-2 border-b border-gray-600 justify-between bg-neutral"
      }
      key={noti.id}
    >
      <div className="flex items-center gap-2">
        <PiBellSimpleRingingFill size={25} className="text-gray-300" />
        <span className="font-pt">@{splitString[0]}</span>
      </div>
      <BsThreeDots
        size={23}
        onClick={() => setShowMenu(!showMenu)}
        className="cursor-pointer hover:text-white transition"
      />

      {showMenu && (
        <ul className="menu bg-base-200 w-56 rounded-box absolute z-50 top-12 right-0">
          <li onClick={handleClick}>
            <a>
              <FaTrash size={15} />
              Mark as read
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}
