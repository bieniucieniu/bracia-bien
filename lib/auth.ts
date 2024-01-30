import { getServerSession, Session } from "next-auth"
import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { NextRequest } from "next/server"

const allowed = ["bienmikolaj@gmail.com", "braciabien@gmail.com"]

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      client: {
        token_endpoint_auth_method: "client_secret_post",
      },
    }),
  ],
}

export default authOptions

export async function getAuth(
  req?: NextRequest,
): Promise<undefined | Session["user"]> {
  const session = await getServerSession({ req, ...authOptions })
  if (!session || !session.user?.email || !allowed.includes(session.user.email))
    return undefined

  return session.user
}
