import type {
  addImagesData as addImages,
  deleteImagesData as deleteImages,
  updateImagesData as updateImages,
} from "./imagesData/serverApi"
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
