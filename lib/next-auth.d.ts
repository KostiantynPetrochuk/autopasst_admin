import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      name: string;
      roles: string[];
    };

    tokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
    error?: string;
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: number;
      email: string;
      name: string;
      roles: string[];
    };

    tokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
    error?: string;
  }
}
