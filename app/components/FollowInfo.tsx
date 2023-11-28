"use client";

import { useRouter } from "next/navigation";

interface props {
  following: number | undefined;
  followers: number | undefined;
}

export default function FollowInfo({ followers, following }: props) {
  const router = useRouter();
  return (
    <div
      className="flex items-center gap-5 hover:cursor-pointer"
      onClick={() => router.push("/follow")}
    >
      <div className="flex items-center gap-1">
        <h4 className="font-medium">{following}</h4>
        <span className="text-sm">Following</span>
      </div>
      <div className="flex items-center gap-1">
        <h4 className="font-medium">{followers}</h4>
        <span className="text-sm">Followers</span>
      </div>
    </div>
  );
}
