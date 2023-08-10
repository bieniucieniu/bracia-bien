import { addImages, deleteImages, updateImages } from "@/db/postgres"
import { getAuth } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const session = await getAuth()
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })

  const data = await req.json()
  if (data.images) {
    const added = await addImages(data.images)
    if (added.error) return NextResponse.json(...added.error)
    return NextResponse.json({ added })
  }

  NextResponse.json({ message: "no data provaided" })
}
export async function PATCH(req: Request) {
  const session = await getAuth()
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })

  const data = await req.json()

  const res: { deleted?: any; updated?: any } = {}

  if (data.updateImages) {
    const updated = await updateImages(data.updateImages)
    if (updated.error) return NextResponse.json(...updated.error)

    res.updated = updated
  }

  if (data.deleteImages) {
    const deleted = await deleteImages(data.deleteImages)
    if (deleted.error) return NextResponse.json(...deleted.error)

    res.deleted = deleted
  }

  return NextResponse.json(res)
}
