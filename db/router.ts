import {
  addImagesData,
  deleteImagesData,
  updateImagesData,
} from "@/db/imagesData/serverApi"
import { getAuth } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const session = await getAuth()
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })

  const data = await req.json()
  if (data.images) {
    const res = await addImagesData(data.images)
    return NextResponse.json(res)
  }

  NextResponse.json({ message: "no data provaided" })
}
export async function PATCH(req: Request) {
  const session = await getAuth()
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })

  const data = await req.json()

  const res: { deleted?: any; updated?: any } = {
    deleted: undefined,
    updated: undefined,
  }

  if (data.updateImagesData) {
    const updated = await updateImagesData(data.updateImagesData)

    res.updated = updated
  }

  if (data.deleteImagesData) {
    const deleted = await deleteImagesData(data.deleteImagesData)

    res.deleted = deleted
  }

  return NextResponse.json(res)
}
