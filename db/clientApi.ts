import { insertImagesSchema } from "./imagesData/serverApi"
import type {
  addImagesData as addImages,
  deleteImagesData as deleteImages,
  updateImagesData as updateImages,
} from "./imagesData/serverApi"
import type {
  addInfoCards as addCards,
  deleteInfoCards as deleteCards,
  updateInfoCards as updataCards,
} from "./infoCard/serverApi"
import { z } from "zod"
export async function addImagesData(
  data: Parameters<typeof addImages>[0] | undefined,
  onCompleat?: (res?: Response | any) => void,
) {
  if (!data) return
  if (!data.length) {
    throw new Error("no data provided")
  }

  try {
    const res = await fetch("/api/postgres", {
      method: "POST",
      body: JSON.stringify({ addImagesData: data }),
    })

    onCompleat && onCompleat(res)
  } catch (e) {
    onCompleat && onCompleat(e)
  }
}

export async function updateImagesData(
  data: Parameters<typeof updateImages>[0] | undefined,
  onCompleat?: (res?: Response | any) => void,
) {
  if (!data) return
  if (!data.length) {
    throw new Error("no data provided")
  }
  try {
    const res = await fetch("/api/postgres", {
      method: "PATCH",
      body: JSON.stringify({ updateImagesData: data }),
    })

    onCompleat && onCompleat(res)
  } catch (e) {
    onCompleat && onCompleat(e)
  }
}

export async function deleteImagesData(
  data: Parameters<typeof deleteImages>[0] | undefined,
  onCompleat?: (res?: Response | any) => void,
) {
  if (!data) return
  try {
    if (!data.length) {
      throw new Error("no data provided")
    }

    const res = await fetch("/api/postgres", {
      method: "PATCH",
      body: JSON.stringify({ deleteImagesData: data }),
    })

    onCompleat && onCompleat(res)
  } catch (e) {
    onCompleat && onCompleat(e)
  }
}

export async function addInfoCards(
  data: Parameters<typeof addCards>[0] | undefined,
  onCompleat?: (res?: Response | any) => void,
) {
  if (!data) return
  try {
    if (!data.length) {
      throw new Error("no data provided")
    }

    const res = await fetch("/api/postgres", {
      method: "POST",
      body: JSON.stringify({ addInfoCards: data }),
    })

    onCompleat && onCompleat(res)
  } catch (e) {
    onCompleat && onCompleat(e)
  }
}
export async function deleteInfoCards(
  data: Parameters<typeof deleteCards>[0] | undefined,
  onCompleat?: (res?: Response | any) => void,
) {
  if (!data) return
  if (!data.length) {
    throw new Error("no data provided")
  }
  try {
    const res = await fetch("/api/postgres", {
      method: "PATCH",
      body: JSON.stringify({ deleteInfoCards: data }),
    })

    onCompleat && onCompleat(res)
  } catch (e) {
    onCompleat && onCompleat(e)
  }
}

export async function updateInfoCards(
  data: Parameters<typeof updataCards>[0] | undefined,
  onCompleat?: (res?: Response | any) => void,
) {
  if (!data) return
  if (!data.length) {
    throw new Error("no data provided")
  }
  try {
    const res = await fetch("/api/postgres", {
      method: "PATCH",
      body: JSON.stringify({ updateInfoCards: data }),
    })

    onCompleat && onCompleat(res)
  } catch (e) {
    onCompleat && onCompleat(e)
  }
}

const imagesDataSchema = insertImagesSchema
  .extend({
    url: z.string().url().optional(),
  })
  .array()

export async function getImagesData(
  onCompleat?: (data?: z.infer<typeof imagesDataSchema>) => void,
): Promise<z.infer<typeof imagesDataSchema> | undefined | Error> {
  try {
    const res = await fetch("/api/postgres/images_data")

    if (!res.ok) return undefined

    const json = await res.json()
    if (!json.images) return []
    imagesDataSchema.parse(json.images)
    onCompleat && onCompleat(json.images)
    return json.images
  } catch (e) {
    if (e instanceof Error) return e
    console.log(e)
  }
}
