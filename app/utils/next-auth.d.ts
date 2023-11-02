import NextAuth from "next-auth/next";

declare module "nex-auth" {
  interface User {
    id: string;
  }

  export interface Session {
    user: User & {
      id: string;
    };
    token: {
      id: string;
    };
  }
}
