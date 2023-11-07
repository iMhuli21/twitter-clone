import { BsBell, BsHouse, BsSearch } from "react-icons/bs";
import { LuMail } from "react-icons/lu";
import { BiUser } from "react-icons/bi";
import { FaGears } from "react-icons/fa6";
import { ISODateString } from "next-auth";

export enum THEME {
  DARK = "DARK",
  LIGHT = "LIGHT",
}

export const toastOptions = {
  style: {
    borderRadius: "10px",
    background: "#333",
    color: "#dadada",
    fontFamily: "Inter",
  },
};

export const routes = [
  {
    icon: BsHouse,
    label: "Home",
    href: "/home",
  },
  {
    icon: BsSearch,
    label: "Search",
    href: "/search",
  },
  {
    icon: BsBell,
    label: "Notifications",
    href: "/notifications",
  },
  {
    icon: LuMail,
    label: "Messages",
    href: "/messages",
  },
  {
    icon: BiUser,
    label: "Profile",
    href: "/profile",
  },
  {
    icon: FaGears,
    label: "Settings",
    href: "/settings",
  },
];

export function isCustomError(obj: any): obj is ICustomError {
  return "error" in obj;
}

interface ICustomError {
  error: string;
}

export interface ISession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string | null;
  };
  expires: ISODateString;
}

export interface IUser {
  id: string;
  bannerImage: string | null;
  bio: string | null;
  createdAt: Date;
  email: string;
  following: number;
  followers: number;
  headerTitle: string;
  password: string;
  photo: string;
  username: string;
}

export interface IAccountProps {
  data: IUser;
  view?: string;
}
export enum Status {
  seen = "seen",
  unseen = "unseen",
}
