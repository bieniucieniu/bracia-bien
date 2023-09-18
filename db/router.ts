import {
  addImagesData,
  deleteImagesData,
  getAllImagesData,
  populateImagesDataWithLinks,
  updateImagesData,
} from "@/db/imagesData/serverApi"
import {
  addInfoCards,
  deleteInfoCards,
  getAllInfoCards,
  updateInfoCards,
} from "@/db/infoCard/serverApi"
import { getAuth } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const session = await getAuth()
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })

  const data = (await req.json()) as {
    addImagesData: Parameters<typeof addImagesData>[0] | undefined
    addInfoCards: Parameters<typeof addInfoCards>[0] | undefined
  }
  if (data.addImagesData !== undefined) {
    const res = await addImagesData(data.addImagesData)
    return NextResponse.json(res)
  }
  if (data.addInfoCards !== undefined) {
    const res = await addInfoCards(data.addInfoCards)
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
    updateInfoCards: Parameters<typeof updateInfoCards>[0] | undefined
    deleteInfoCards: Parameters<typeof deleteInfoCards>[0] | undefined
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

  if (data.updateInfoCards !== undefined) {
    const updated = await updateInfoCards(data.updateInfoCards)
    res.cards.updated = updated
  }

  if (data.deleteInfoCards !== undefined) {
    const deleted = await deleteInfoCards(data.deleteInfoCards)
    res.cards.deleted = deleted
  }

  return NextResponse.json(res)
}

export async function GET(
  _req: Request,
  { params }: { params: { get: "images_data" | "info_cards" } },
) {
  if (params.get === "images_data") {
    const data = await populateImagesDataWithLinks(await getAllImagesData())
    return NextResponse.json({ images: data })
  }

  if (params.get === "info_cards") {
    const data = await getAllImagesData()
    return NextResponse.json({ cards: data })
  }

  return NextResponse.json({})
}
