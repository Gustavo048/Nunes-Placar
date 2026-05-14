import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({

  providers: [

    Credentials({

      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {

        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user) {
          return null;
        }

        const passwordMatch = await compare(
          credentials.password as string,
          user.password
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

 callbacks: {

  async jwt({ token, user }) {

    // PRIMEIRO LOGIN
    if (user) {

      token.id = user.id;
      token.role = user.role;
      token.status = user.status;
    }

    // SEMPRE BUSCA DADOS ATUALIZADOS
    if (token.email) {

      const dbUser = await prisma.user.findUnique({
        where: {
          email: token.email,
        },
      });

      if (dbUser) {

        token.role = dbUser.role;
        token.status = dbUser.status;
      }
    }

    return token;
  },

  async session({ session, token }) {

    if (session.user) {

      session.user.id = token.sub as string;
      session.user.role = token.role as string;
      session.user.status = token.status as string;
    }

    return session;
  },
},

  secret: process.env.AUTH_SECRET,
});