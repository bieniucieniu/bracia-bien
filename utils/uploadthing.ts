import { generateComponents } from "@uploadthing/react"

import type { TFileRouter } from "@/lib/uploadthing"

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<TFileRouter>()
