import { getServerSession } from "next-auth";
import { authOptions } from "../utils/Auth";
import { ISession, IUser } from "../utils/constants";
import prisma from "../utils/Db";
import CreatePost from "./CreatePost";
import Content from "./Content";

export default async function Feed() {
  let user: IUser | null = null;
  const session = await getServerSession(authOptions);

  if (session?.user) {
    user = await prisma.user.findUnique({
      where: {
        id: `${(session as ISession).user?.id}`,
      },
    });
  }

  return (
    <div className="col-span-5 lg:col-span-3">
      <div className="py-5 border-b border-gray-600">
        <h1 className="text-center font-extrabold text-lg">Home</h1>
      </div>
      {user && <CreatePost id={user?.id} photo={user?.photo} />}
      <Content />
    </div>
  );
}
