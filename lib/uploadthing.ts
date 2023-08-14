import {
  createUploadthing,
  type FileRouter as RouterUpload,
} from "uploadthing/next"
import { getServerSession } from "next-auth"
import authOptions from "./auth"

const f = createUploadthing()

const auth = async (_req: Request) => {
  const allowedEmails = ["bienmikolaj@gmail.com", "braciabien@gmail.com"]

  const session = await getServerSession(authOptions)
  if (
    !session ||
    !session.user?.email ||
    !allowedEmails.includes(session.user.email)
  )
    return undefined
  return { id: session.user.email }
}

export const fileRouter = {
  image: f({ image: { maxFileSize: "4MB", maxFileCount: 99999 } })
    .middleware(async ({ req }) => {
      const user = await auth(req)

      if (!user) throw new Error("Unauthorized")

      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId)
      console.log("file url", file.url)
    }),
} satisfies RouterUpload

export type FileRouter = typeof fileRouter
