import NextAuth, { DefaultSession } from "next-auth"
import { SessionOptions } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"
import GoogleProvider from "next-auth/providers/google"
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/'
  },
  callbacks: {
    async session({ session, token, }: { session: DefaultSession, token: DefaultJWT, }) {
      return { ...session, user: { ...session.user, uid: token.sub } } 
    }
  }

}

export default NextAuth(authOptions)