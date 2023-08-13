import {
  type addImages,
  type deleteImages,
  type updateImages,
} from "@/db/postgres"
export async function addImagesData(
  images: Parameters<typeof addImages>[0],
  onCompleat?: (res?: Response | any) => void,
) {
  try {
    const res = await fetch("/api/postgres", {
      method: "POST",
      body: JSON.stringify({ images }),
    })

    onCompleat && onCompleat(res)
  } catch (e) {
    onCompleat && onCompleat(e)
  }
}

export async function patchImagesData(
  data: {
    updateImages?: Parameters<typeof updateImages>[0]
    deleteImages?: Parameters<typeof deleteImages>[0]
  },
  onCompleat?: (res?: Response | any) => void,
) {
  try {
    if (!data.updateImages && !data.deleteImages) {
      throw new Error("no data provided")
    }

    const res = await fetch("/api/postgres", {
      method: "PATCH",
      body: JSON.stringify(data),
    })

    onCompleat && onCompleat(res)
  } catch (e) {
    onCompleat && onCompleat(e)
  }
}
