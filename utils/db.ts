import {
  type addImages,
  type deleteImages,
  type updateImages,
} from "@/db/postgres"
import { images } from "@/db/schema"
import { InferModel } from "drizzle-orm"
export async function addImagesData(
  images: Parameters<typeof addImages>[0],
  onCompleat?: (res: Response) => void,
) {
  const res = await fetch("/api/postgres", {
    method: "POST",
    body: JSON.stringify({ images }),
  })

  onCompleat && onCompleat(res)
}

export async function patchImagesData(
  data: {
    updateImages?: Parameters<typeof updateImages>[0]
    deleteImages?: Parameters<typeof deleteImages>[0]
  },
  onCompleat?: (res: InferModel<typeof images>) => void,
) {
  if (!data.updateImages && !data.deleteImages) {
    throw new Error("no data provided")
  }

  const dbRes = await fetch("/api/postgres", {
    method: "PATCH",
    body: JSON.stringify(data),
  })

  const { res } = await dbRes.json()

  onCompleat && onCompleat(res)
}
