import { NextAuthOptions } from "next-auth";
import ENV_SECRETS from "./ENV_SECRETS";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/app/lib/prisma";

export const authOptions : NextAuthOptions = {

session:{

  strategy:"jwt" 

},

secret:ENV_SECRETS.NEXTAUTH_SECRET ,

adapter:PrismaAdapter(prisma) ,



providers:[]



} 