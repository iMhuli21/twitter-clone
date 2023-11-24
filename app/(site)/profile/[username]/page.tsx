import LeftSideBar from "@/app/components/LeftSideBar";
import ProfileInfo from "@/app/components/ProfileInfo";
import RightSideBar from "@/app/components/RightSideBar";
import { authOptions } from "@/app/utils/Auth";
import prisma from "@/app/utils/Db";
import { ISession } from "@/app/utils/constants";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface ProfileProps {
  params: {
    username: string;
  };
  searchParams: {
    view: string | null;
  };
}

export default async function Profile({ params, searchParams }: ProfileProps) {
  return (
    <main className="page">
      <LeftSideBar />
      <ProfileInfo profileUser={params.username} active={searchParams.view} />
      <RightSideBar />
    </main>
  );
}
