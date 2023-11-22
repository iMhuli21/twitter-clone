"use client";

import { MouseEventHandler } from "react";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";

interface props {
  count: string;
  onClick?: MouseEventHandler;
}

export default function Comments({ count, onClick }: props) {
  return (
    <div
      className="flex items-center gap-2 hover:cursor-pointer hover:text-info transition"
      onClick={onClick}
    >
      <HiOutlineChatBubbleOvalLeft size={20} />
      <span className="text-sm text-gray-600">{count}</span>
    </div>
  );
}
