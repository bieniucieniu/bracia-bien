import {
  createUploadthing,
  type FileRouter as RouterUpload,
} from "uploadthing/next"
import { getServerSession } from "next-auth"
import authOptions from "./auth"
import { z } from "zod"
import { NextResponse } from "next/server"
import { utapi } from "uploadthing/server"
import { getAll } from "@vercel/edge-config"
import { edgeConfigSchema, setEdgeConfig } from "./edgeconfig"

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

export const deleteSchema = z.object({
  items: z.string().array().nonempty(),
})

export async function deleteHandler(req: Request) {
  const allowed = ["bienmikolaj@gmail.com", "braciabien@gmail.com"]
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.email || !allowed.includes(session.user.email))
    return NextResponse.json("Unauthorized", { status: 401 })

  const body: z.infer<typeof deleteSchema> = await req.json()
  if (!deleteSchema.safeParse(body).success)
    return NextResponse.json(
      { message: "invalid data", data: body },
      { status: 401 },
    )

  const edgeConfig: z.infer<typeof edgeConfigSchema> = await getAll()

  const newMain = edgeConfig.mainImgKeys?.filter((e) => {
    if (body.items.includes(e)) return false
    return true
  })

  const newCurrent = edgeConfig.currentImgKeys?.filter((e) => {
    if (body.items.includes(e)) return false
    return true
  })

  await setEdgeConfig({ currentImgKeys: newCurrent, mainImgKeys: newMain })

  const res = await utapi.deleteFiles(body.items)

  return NextResponse.json(res)
}
