import BackBtn from "@/app/components/BackBtn";
import CustomComment from "@/app/components/CustomComment";
import LeftSideBar from "@/app/components/LeftSideBar";
import RightSideBar from "@/app/components/RightSideBar";
import prisma from "@/app/utils/Db";
import { redirect } from "next/navigation";

interface props {
  params: {
    id: string;
  };
}

export default async function Replies({ params }: props) {
  const comment = await prisma.comment.findUnique({
    where: {
      id: params.id,
    },
    include: {
      replies: true,
      retweets: true,
      likes: true,
    },
  });
  if (!comment) redirect("/home");
  return (
    <main className="page">
      <LeftSideBar />
      <div className="col-span-6 sm:col-span-5 lg:col-span-3">
        <div className="py-5 border-b border-gray-600 flex items-center w-full px-2">
          <BackBtn />
          <h1 className="text-center font-extrabold text-lg w-full">Replies</h1>
        </div>
        <CustomComment comment={comment} />
      </div>
      <RightSideBar />
    </main>
  );
}
