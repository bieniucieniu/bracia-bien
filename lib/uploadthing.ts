import {
  createUploadthing,
  type FileRouter as RouterUpload,
} from "uploadthing/next"
import { getServerSession } from "next-auth"
import authOptions from "./auth"
import { z } from "zod"
import { NextResponse } from "next/server"
import { utapi } from "uploadthing/server"

const f = createUploadthing()

export const deleteSchema = z.object({
  items: z.string().array().nonempty(),
})

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
  image: f({ image: { maxFileSize: "1MB", maxFileCount: 99999 } })
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

export async function PATCH(req: Request) {
  const allowed = ["bienmikolaj@gmail.com", "braciabien@gmail.com"]
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.email || !allowed.includes(session.user.email))
    return NextResponse.json("Unauthorized", { status: 401 })

  const body = await req.json()
  if (!deleteSchema.safeParse(body).success)
    return NextResponse.json(
      { message: "invalid data", data: body },
      { status: 401 },
    )

  const res = await utapi.deleteFiles(body.items)

  return NextResponse.json(res)
}
