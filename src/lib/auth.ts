import { AuthOptions, DefaultSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export interface DB_User extends DefaultSession {
  id: string
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (session?.user && token.sub) {
        ;(session.user as DB_User).id = token.sub
      }
      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
}
