import NextAuth, { type AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/libs/prismadb";
import { compare } from 'bcrypt'

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60
  },
  debug: process.env.NODE_ENV === 'development',
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    // maxAge:  30,
    // You can define your own encode/decode functions for signing and encryption
    // async encode() {},
    // async decode() {},
  },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   return true
    // },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl
    // },
    async session({ session, user, token }) {
      const currentUser = await prisma.user.findUnique({
        where: {
          email: session?.user?.email as string,
        }
      })
      return { ...session, userId: currentUser?.id}
    },
    async jwt({ token, user, account, profile }) {
      return token
    }
  },
  pages: {
    // signIn: '/auth/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  events: {
    signIn: ({ user, account, profile, isNewUser }) => {
      // console.log(user, account, profile, isNewUser)
      console.log("NODE_ENV", process.env.NODE_ENV)
    },
    session: ({ token, session }) => {
      // console.log('token: \n', token, 'session: \n', session)
    }
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Your email" },
        password: { label: "Password", type: "password", placeholder: "Your password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credenetials")
        }
        
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        const isPasswordValid = await compare(credentials?.password, user?.hashedPassword as string)
        if (!isPasswordValid) {
          throw new Error("Incorrect username or password")
        }
        return user   
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
  ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }