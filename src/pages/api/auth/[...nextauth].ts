import NextAuth, { Account, Profile, Session, User } from 'next-auth'
import Okta from 'next-auth/providers/okta'
import { random } from 'nanoid'
import { JWT } from 'next-auth/jwt'
import { AdapterUser } from 'next-auth/adapters'

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Okta({
      clientId: process.env.OKTA_OAUTH2_CLIENT_ID as string,
      clientSecret: process.env.OKTA_OAUTH2_CLIENT_SECRET as string,
      issuer: process.env.OKTA_OAUTH2_ISSUER as string
    })
  ],
  secret: process.env.SECRET as string,
  callbacks: {
    async session({ session, token, user }: { session: Session; token: JWT; user: AdapterUser }) {
      console.log(session, token, user)
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }: {
      token: JWT;
      user: User | AdapterUser;
      account: Account | null;
      profile?: Profile;
      isNewUser?: boolean
    }) {
      console.log(token, user, account, profile, isNewUser)
      return token
    }
  }
}

export default NextAuth(authOptions)