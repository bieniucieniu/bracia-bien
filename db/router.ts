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

  const data = (await req.json()) as {
    addImagesData: Parameters<typeof addImagesData>[0] | undefined
  }
  if (data.addImagesData !== undefined) {
    const res = await addImagesData(data.addImagesData)
    return NextResponse.json(res)
  }
  NextResponse.json({ message: "no data provaided" })
}
export async function PATCH(req: Request) {
  const session = await getAuth()
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })

  const data = (await req.json()) as {
    updateImagesData: Parameters<typeof updateImagesData>[0] | undefined
    deleteImagesData: Parameters<typeof deleteImagesData>[0] | undefined
  }

  const res: {
    images: { deleted?: any; updated?: any }
    cards: { deleted?: any; updated?: any }
  } = { images: {}, cards: {} }

  if (data.updateImagesData !== undefined) {
    const updated = await updateImagesData(data.updateImagesData)
    res.images.updated = updated
  }

  if (data.deleteImagesData !== undefined) {
    const deleted = await deleteImagesData(data.deleteImagesData)
    res.images.deleted = deleted
  }
  return NextResponse.json(res)
}
