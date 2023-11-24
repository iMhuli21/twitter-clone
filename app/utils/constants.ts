import { BsBell, BsHouse, BsSearch } from "react-icons/bs";
import { LuMail } from "react-icons/lu";
import { BiUser } from "react-icons/bi";
import { FaGears } from "react-icons/fa6";
import { ISODateString } from "next-auth";
import { $Enums, Prisma } from "@prisma/client";

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

export interface ICustomMessage {
  success: string;
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
  bio: string;
  createdAt: Date;
  email: string;
  following?: IFollowing[];
  followers?: IFollowing[];
  headerTitle: string;
  notifications?: INotifications[];
  password: string;
  photo: string;
  username: string;
}

export interface INotifications {
  id: string;
  body: string;
  createdAt: Date;
  status: $Enums.Status;
  receiverId: string;
}

export interface IFollowing {
  id: string;
  userId: string;
  followId: string;
}

export interface IPost {
  id: string;
  authorId: string;
  body: string | null;
  createdAt: Date;
  media: string[];
  likes?: ILikePost[];
  comments?: IComment[];
  retweets?: IRetweetPost[];
}

export interface IRetweets {
  id: string;
  postId: string;
  commentId: string;
  userId: string;
}

export interface IComment {
  id: string;
  body: string | null;
  createdAt: Date;
  media: string[];
  postId: string;
  userId: string;
  likes?: ILikeComment[];
  retweets?: IRetweetComment[];
  replies?: IReply[];
}

export interface ILikePost {
  id: string;
  postId: string;
  userId: string;
}

export interface IReply {
  id: string;
  commentId: string;
  userId: string;
  body: string | null;
  media: string[];
  createdAt: Date;
}

export interface IRetweetPost {
  id: string;
  postId: string;
  userId: string;
}

export interface IRetweetComment {
  id: string;
  commentId: string;
  userId: string;
}

export interface ILikeComment {
  id: string;
  commentId: string;
  userId: string;
}
export interface IAccountProps {
  data: IUser;
  view?: string;
}
export enum Status {
  seen = "seen",
  unseen = "unseen",
}

export const DIVISIONS: DivisionsType[] = [
  { amount: 60, name: "seconds" },
  { amount: 60, name: "minutes" },
  { amount: 24, name: "hours" },
  { amount: 7, name: "days" },
  { amount: 4.34524, name: "weeks" },
  { amount: 12, name: "months" },
  { amount: Number.POSITIVE_INFINITY, name: "years" },
];

interface DivisionsType {
  amount: number;
  name: Intl.RelativeTimeFormatUnit;
}

const time = new Intl.RelativeTimeFormat("en-us", {
  numeric: "auto",
});

export function formatTimeAgo(date: Date) {
  let duration = (date.getTime() - new Date().getTime()) / 1000;

  for (let i = 0; i < DIVISIONS.length; i++) {
    const division = DIVISIONS[i];
    if (Math.abs(duration) < division.amount) {
      return time.format(Math.round(duration), division.name);
    }
    duration /= division.amount;
  }
}

export const items = ["Posts", "Replies", "Retweets", "Likes", "Comments"];
