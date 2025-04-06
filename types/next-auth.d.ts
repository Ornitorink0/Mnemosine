import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      role: string;
      createdAt: Date;
      updatedAt: Date;
      sessions: ISession[];
      notes: string[];
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    username: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    sessions: ISession[];
    notes: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    sessions: ISession[];
    notes: string[];
  }
}
