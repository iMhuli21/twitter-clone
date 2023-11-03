import prisma from "@/app/utils/Db";
import validator from "validator";
import { compare, hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body: { password: string; id: string } = await req.json();

    if (!body.password || !body.id)
      throw new Error("No password or id provided");

    //get the users current info
    const user = await prisma.user.findUnique({
      where: {
        id: body.id,
      },
    });

    if (!user) throw new Error("User does not exist");

    //check if the updated username is the same as the current one
    const matchPasswords = await compare(body.password, user.password);

    if (matchPasswords)
      throw new Error("Cannot change password to the same one");

    //check if it is strong enough
    const isStrong = validator.isStrongPassword(body.password, {
      minLength: 8,
      minUppercase: 1,
      minSymbols: 1,
    });

    if (!isStrong)
      throw new Error(
        "Password must have one uppercase,symbol and minimum of 8 characters"
      );

    //hash the new Password
    const hashPassword = await hash(body.password, 10);

    const updateUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashPassword,
      },
    });

    if (!updateUser) throw new Error("Something went wrong, try again");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    let msg;
    if (error instanceof Error) {
      msg = error.message;
    }

    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
