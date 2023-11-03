import LeftSideBar from "@/app/components/LeftSideBar";
import Account from "@/app/components/Account";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/Auth";
import { redirect } from "next/navigation";
import prisma from "@/app/utils/Db";
import { ISession } from "@/app/utils/constants";

export default async function Settings() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/home");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: (session as ISession).user?.id as string,
    },
  });

  if (!user) return;

  return (
    <main className="page">
      <LeftSideBar />
      <Account data={user} />
    </main>
  );
}
