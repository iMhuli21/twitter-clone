"use client";

import { useRouter } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";

export default function BackBtn() {
  const router = useRouter();
  return (
    <div
      className="flex items-center justify-center p-2 rounded-full hover:cursor-pointer hover:bg-neutral"
      onClick={() => router.back()}
    >
      <BsArrowLeft size={20} />
    </div>
  );
}
