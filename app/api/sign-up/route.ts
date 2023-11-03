import { NextResponse } from "next/server";
import validator from "validator";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { hash } from "bcrypt";
import prisma from "@/app/utils/Db";

interface IBodyData {
  email: string;
  password: string;
  username: string;
}

export async function POST(req: Request) {
  try {
    const body: IBodyData = await req.json();

    if (!body.email || !body.password || !body.username) {
      throw new Error("All fields are required");
    }

    //validate
    const validEmail = validator.isEmail(body.email);

    if (!validEmail) throw new Error("Invalid Email");

    const validPassword = validator.isStrongPassword(body.password, {
      minLength: 8,
      minUppercase: 1,
      minSymbols: 1,
    });

    if (!validPassword)
      throw new Error(
        "Password must have one uppercase,symbol and minimum of 8 characters"
      );

    //hash password
    const hashedPassword = await hash(body.password, 10);

    const image = "/default/profile_picture.jpg";

    const createAccount = await prisma.user.create({
      data: {
        email: body.email,
        headerTitle: body.username,
        password: hashedPassword,
        photo: image,
        username: body.username,
      },
    });

    if (!createAccount) throw new Error("Something went wrong, try again");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    let msg;
    if (error instanceof Error) {
      msg = error.message;
    }

    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        msg = "Email or username already exists";
      }
    }

    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
