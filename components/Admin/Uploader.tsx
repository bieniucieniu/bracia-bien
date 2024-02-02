"use client"

import { UploadButton } from "@/lib/uploadthing"

export default function Uploader() {
  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={() => {
        window.location.reload()
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`)
      }}
    />
  )
}
