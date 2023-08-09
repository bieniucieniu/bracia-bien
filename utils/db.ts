import { insertImagesSchema, uuidArraySchema } from "@/db/postgres"
import { z } from "zod"
export async function addImagesData(
  images: z.infer<typeof insertImagesSchema>,
  onCompleat?: (res: Response) => void,
) {
  insertImagesSchema.parse(images)

  const res = await fetch("/api/postgres", {
    method: "POST",
    body: JSON.stringify({ images }),
  })

  onCompleat && onCompleat(res)
}

export async function updateDeleteImages(
  data: {
    updateImages?: z.infer<typeof uuidArraySchema>
    deleteImages?: z.infer<typeof uuidArraySchema>
  },
  onCompleat?: (res: Response) => void,
) {
  if (!data.updateImages && !data.deleteImages) {
    throw new Error("no data provided")
  }
  if (data.updateImages) uuidArraySchema.parse(data.updateImages)
  if (data.deleteImages) uuidArraySchema.parse(data.deleteImages)

  const res = await fetch("/api/postgres", {
    method: "PATCH",
    body: JSON.stringify(data),
  })

  onCompleat && onCompleat(res)
}
