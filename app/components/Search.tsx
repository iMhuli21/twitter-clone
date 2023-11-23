"use client";

import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { IUser, isCustomError, toastOptions } from "../utils/constants";
import toast from "react-hot-toast";
import { MdVerified } from "react-icons/md";

export default function Search() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [data, setData] = useState<IUser[]>([]);

  const searchForUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!search) {
      toast.error("No search key", toastOptions);
      return;
    }

    const sendReq = await fetch(`/api/search?q=${search}`);

    const sentRes = await sendReq.json();

    if (isCustomError(sentRes)) {
      toast.error(sentRes.error, toastOptions);
    } else {
      setData(sentRes as IUser[]);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center gap-2 w-full h-12 input input-bordered rounded-3xl bg-neutral">
        <BsSearch className="text-xl" />
        <form onSubmit={searchForUser} className="w-full">
          <input
            type="text"
            name="search"
            id="search"
            value={search}
            placeholder="Search"
            className="bg-inherit w-full"
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>

      {data.length !== 0 && (
        <div className="w-full bg-base-200 py-6 px-5 rounded-xl mt-5 flex flex-col items-start gap-3">
          {data.map((acc) => (
            <div
              className="flex items-center gap-2 hover:bg-neutral w-full p-2 cursor-pointer rounded transition"
              onClick={() => router.push(`/profile/${acc.username}`)}
              key={acc.id}
            >
              <img
                src={acc.photo}
                alt="user profile"
                className="w-10 h-10 object-cover object-center rounded-full"
              />
              <div className="flex flex-col gap-1">
                <h3 className="flex items-center gap-1">
                  {acc.headerTitle}{" "}
                  <MdVerified className="text-sky-700" size={20} />{" "}
                </h3>
                <span className="text-sm text-gray-600">@{acc.username}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
