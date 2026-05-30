import { DefaultSession, NextAuthOptions } from "next-auth";
import ENV_SECRETS from "./ENV_SECRETS";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/app/lib/prisma";
import GoogleProvider from "next-auth/providers/google";

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

      const user = await prisma.user.findFirst({
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

        session.user.email = token.email
        session.user.name = token.name
        session.user.id = token.id

      };

      return session;
    }

  },

secret: ENV_SECRETS.NEXTAUTH_SECRET,

adapter: PrismaAdapter(prisma),

providers:[

  GoogleProvider({
     clientId: ENV_SECRETS.Google_clientId as string , 
    clientSecret:ENV_SECRETS.Google_clientSecret as string ,
  })

]

} 