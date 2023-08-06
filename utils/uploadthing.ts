import { deleteSchema } from "@/lib/uploadthing"
import { generateUploadThingURL } from "@uploadthing/shared"
function getApiKeyOrThrow() {
  if (!process.env.UPLOADTHING_SECRET)
    throw new Error("Missing UPLOADTHING_SECRET env variable.")
  return process.env.UPLOADTHING_SECRET
}

export async function deleteFiles(
  items: string[],
  onCompleat?: (res: Response) => void,
) {
  const res = await fetch("/api/uploadthing", {
    method: "PATCH",
    body: JSON.stringify({ items }),
  })

  onCompleat && onCompleat(res)
}
