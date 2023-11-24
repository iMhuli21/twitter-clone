"use client";

import { MouseEventHandler } from "react";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";

interface props {
  count: string;
  onClick?: MouseEventHandler;
  active: boolean;
}

export default function Comments({ count, onClick, active }: props) {
  return (
    <div
      className="flex items-center gap-2 hover:cursor-pointer hover:text-info transition"
      onClick={onClick}
    >
      <HiOutlineChatBubbleOvalLeft
        size={20}
        className={active ? "text-blue-600" : "text-gray-300"}
      />
      <span className={active ? "text-blue-600" : "text-gray-600"}>
        {count}
      </span>
    </div>
  );
}
