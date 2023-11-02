import prisma from "./Db";
import { compare } from "bcrypt";
import type { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
    async session({ token, session }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
  },
  pages: {
    error: "/auth/sign-in",
    signIn: "/auth/sign-in",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const userExists = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!userExists) return null;

        const matchPasswords = await compare(
          credentials.password,
          userExists.password
        );

        if (!matchPasswords) return null;

        return {
          id: `${userExists.id}`,
          email: userExists.email,
          name: userExists.username,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
