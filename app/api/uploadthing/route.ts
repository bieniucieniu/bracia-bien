import { createNextRouteHandler } from "uploadthing/next"

import { deleteSchema, fileRouter } from "@/lib/uploadthing"
import { getServerSession } from "next-auth"
import authOptions from "@/lib/auth"
import { NextResponse } from "next/server"
import { utapi } from "uploadthing/server"

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: fileRouter,
})

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
