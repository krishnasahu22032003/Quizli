import { DefaultSession, NextAuthOptions } from "next-auth";
import ENV_SECRETS from "./ENV_SECRETS";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/app/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { SignInSchema } from "@/schemas/User.schema";
import { NextResponse } from "next/server";

declare module 'next-auth' {

  interface Session extends DefaultSession {

    user: {
      id: string;
    } & DefaultSession['user'];
  }
};

declare module 'next-auth/jwt' {

  interface JWT {

    id: string

  }

}


export const authOptions: NextAuthOptions = {

  session: {

    strategy: "jwt"

  },

  callbacks: {

    jwt: async ({ token }) => {

      if (!token.email) {
        return token;
      };

      const user = await prisma.user.findUnique({
        where: {
          email: token?.email
        }
      })

      if (user) {

        token.id = user.id;

      }

      return token;
    },

    session: async ({ session, token }) => {

      if (token) {

        session.user.email = token.email as string
        session.user.name = token.name
        session.user.id = token.id

      };

      return session;
    }

  },

  secret: ENV_SECRETS.NEXTAUTH_SECRET,

  adapter: PrismaAdapter(prisma),

  providers: [

    GoogleProvider({
      clientId: ENV_SECRETS.Google_clientId as string,
      clientSecret: ENV_SECRETS.Google_clientSecret as string,
    }),

    CredentialsProvider({

      name: "credentials",

      credentials: {
        email: {},
        password: {}
      },

      async authorize(credentials: Record<string, string> | undefined) {

        const parsedData = SignInSchema.safeParse(credentials);

        if (!parsedData.success) {
          return null
        }

        const { email, password } = parsedData.data;

        const user = await prisma.user.findUnique({
          where: {
            email
          }
        });

        if (!user) {
          return null;
        };

        if (!user.password) {
          return null;
        };


        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
          return null;
        };

        return {
          id: user.id,
          name: user.username,
          email: user.email
        };
      },

    })

  ]

} 