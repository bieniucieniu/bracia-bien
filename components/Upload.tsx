"use client"

import { generateComponents } from "@uploadthing/react"

import type { TFileRouter } from "@/lib/uploadthing"

const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<TFileRouter>()

export default function Home() {
  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log("Files: ", res)
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`)
      }}
    />
  )
}
