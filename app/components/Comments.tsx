"use client";

import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";

interface props {
  count: string;
}

export default function Comments({ count }: props) {
  return (
    <div className="flex items-center gap-2 hover:cursor-pointer hover:text-info transition">
      <HiOutlineChatBubbleOvalLeft size={20} />
      <span className="text-sm text-gray-600">{count}</span>
    </div>
  );
}
