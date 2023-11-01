import { BsBell, BsHouse, BsSearch } from "react-icons/bs";
import { LuMail } from "react-icons/lu";
import { BiUser } from "react-icons/bi";
import { FaGears } from "react-icons/fa6";

export enum THEME {
  DARK = "DARK",
  LIGHT = "LIGHT",
}

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
