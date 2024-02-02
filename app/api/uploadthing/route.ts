import { createRouteHandler } from "uploadthing/next"
import { fileRouter } from "./core"
import { NextResponse, type NextRequest } from "next/server"
import { UTApi } from "uploadthing/server"

export const { GET, POST } = createRouteHandler({
  router: fileRouter,
})

export async function DELETE(req: NextRequest) {
  const param = req.nextUrl.searchParams.get("data")
  if (!param) {
    return NextResponse.json({}, { status: 400 })
  }
  const data = JSON.parse(param) as string[]
  if (!data.length) {
    return NextResponse.json({}, { status: 400 })
  }
  const utapi = new UTApi()

  const res = await utapi.deleteFiles(data)

  if (res.success) {
    return NextResponse.json({}, { status: 200 })
  }

  return NextResponse.json({}, { status: 500 })
}
