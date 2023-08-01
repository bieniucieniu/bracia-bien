import { z } from "zod"

export const edgeConfig = z.object({
  currentImgKeys: z.string().array().optional(),
  mainImgKeys: z.string().array().optional(),
})

export async function setConfig(
  newConfig: z.infer<typeof edgeConfig>,
  onComplete?: (res: Response) => void,
) {
  const res = await fetch("/api/edgeconfig", {
    method: "POST",
    body: JSON.stringify(newConfig),
  })

  onComplete && onComplete(res)
}
