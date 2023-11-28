import BackBtn from "@/app/components/BackBtn";
import LeftSideBar from "@/app/components/LeftSideBar";
import NotificationCard from "@/app/components/NotificationCard";
import RightSideBar from "@/app/components/RightSideBar";
import { authOptions } from "@/app/utils/Auth";
import prisma from "@/app/utils/Db";
import { ISession, IUser } from "@/app/utils/constants";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function NotificationsPage() {
  let user: IUser | null;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/home");
  } else {
    user = await prisma.user.findUnique({
      where: {
        id: (session as ISession).user?.id as string,
      },
      include: {
        notifications: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
  }

  return (
    <main className="page">
      <LeftSideBar />
      <div className="col-span-5 lg:col-span-3">
        <div className="flex items-center w-full gap-5 border-b border-gray-600 py-5">
          <BackBtn />
          <h1 className="w-full text-center">Notifications</h1>
        </div>
        <div className="flex flex-col items-start w-full">
          {user?.notifications?.map((noti) => (
            <NotificationCard noti={noti} key={noti.id} />
          ))}
        </div>
      </div>
      <RightSideBar />
    </main>
  );
}
