import { NextAuthOptions, User, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import YandexProvider from "next-auth/providers/yandex";
import VKProvider from "next-auth/providers/vk";

import db from "./prisma";
import { compare } from "bcrypt";

export const authConfig: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        const dbUser = await db.user.findFirst({
          where: { email: credentials.email },
        });

        //Verify Password here
        //We are going to use a simple === operator
        //In production DB, passwords should be encrypted using something like bcrypt...
        if (!dbUser?.password) {
          return null;
        }

        const passwordCorrect = await compare(
          credentials.password,
          dbUser.password
        );

        const { password, createdAt, id, ...dbUserWithoutPassword } = dbUser;

        return passwordCorrect ? dbUserWithoutPassword : null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    YandexProvider({
      clientId: process.env.YANDEX_ID as string,
      clientSecret: process.env.YANDEX_SECRET as string,
    }),
    VKProvider({
      clientId: process.env.VK_ID as string,
      clientSecret: process.env.VK_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  adapter: PrismaAdapter(db),
  // callbacks: {
  //   async signIn({ user, account, profile }) {
  //     const { email } = user;

  //     // Найти пользователя по провайдеру и providerAccountId
  //     const existingAccount = await db.account.findUnique({
  //       where: {
  //         provider,
  //         providerAccountId,
  //       },
  //       include: {
  //         user: true,
  //       },
  //     });

  //     if (existingAccount) {
  //       // Пользователь уже существует, ничего не делаем
  //       return true;
  //     } else {
  //       // Создаем нового пользователя
  //       await db.user.create({
  //         data: {
  //           name: user.name,
  //           email: user.email,
  //           account: {
  //             provider,
  //             providerAccountId,
  //             access_token: account.access_token,
  //             refresh_token: account.refresh_token,
  //             expires_at: account.expires_at,
  //             token_type: account.token_type,
  //             id_token: account.id_token,
  //             session_state: account.session_state,
  //           },
  //         },
  //       });

  //       return true;
  //     }
  //   },
  //   async session({ session, token, user }) {
  //     session.user.id = user.id;
  //     return session;
  //   },
  // },
};

export async function loginIsRequiredServer() {
  const session = await getServerSession(authConfig);
  if (!session) return redirect("/");
}