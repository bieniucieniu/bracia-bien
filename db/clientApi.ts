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
  try {
    const res = await fetch("/api/postgres", {
      method: "POST",
      body: JSON.stringify({ add: data }),
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
  try {
    if (data.length < 0) {
      throw new Error("no data provided")
    }

    const res = await fetch("/api/postgres", {
      method: "PATCH",
      body: JSON.stringify({ update: data }),
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
    if (data.length < 0) {
      throw new Error("no data provided")
    }

    const res = await fetch("/api/postgres", {
      method: "PATCH",
      body: JSON.stringify({ delete: data }),
    })

    onCompleat && onCompleat(res)
  } catch (e) {
    onCompleat && onCompleat(e)
  }
}
