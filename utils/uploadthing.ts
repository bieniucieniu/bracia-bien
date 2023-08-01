import { deleteSchema } from "@/lib/uploadthing"
import { generateUploadThingURL } from "@uploadthing/shared"
function getApiKeyOrThrow() {
  if (!process.env.UPLOADTHING_SECRET)
    throw new Error("Missing UPLOADTHING_SECRET env variable.")
  return process.env.UPLOADTHING_SECRET
}

export async function listFiles() {
  const res = await fetch(generateUploadThingURL("/api/listFiles"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-uploadthing-api-key": getApiKeyOrThrow(),
      "x-uploadthing-version": "5.2.1",
    },
  })

  const json = (await res.json()) as
    | { files: { key: string; id: string }[] }
    | { error: string }

  if (!res.ok || "error" in json) {
    const message = "error" in json ? json.error : "Unknown error"
    throw new Error(message)
  }

  return json.files
}

export async function deleteFiles(
  items: string[],
  onCompleat?: (res: Response) => void,
) {
  const data = { items }
  deleteSchema.parse(data)
  const res = await fetch("/api/uplaodthing", {
    method: "DELETE",
    body: JSON.stringify(data),
  })

  onCompleat && onCompleat(res)
}
