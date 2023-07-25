"use client"

import { generateReactHelpers } from "@uploadthing/react/hooks"

import type { FileRouter } from "@/lib/uploadthing"
import { Button } from "./ui/button"

import { useDropzone, type FileWithPath } from "react-dropzone"
import { useCallback, useState } from "react"
import ErrorAlert from "./ErrorAlert"

const { useUploadThing } = generateReactHelpers<FileRouter>()

export function UploadZone({ endpoint }: { endpoint?: keyof FileRouter }) {
  const [files, setFiles] = useState<File[]>([])
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFiles([...files, ...acceptedFiles])
    },
    [files],
  )
  const [error, setError] = useState<Error | undefined>({
    name: "sadasda",
    message: "asdsda",
  })

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  })

  const { isUploading, startUpload } = useUploadThing(endpoint ?? "image", {
    onClientUploadComplete: () => {
      setFiles([])
    },
    onUploadError: (error) => {
      setError(error)
    },
    onUploadProgress: (p) => {
      console.log(p)
    },
  })

  return (
    <div>
      <div {...getRootProps({ className: "bg-red-400" })}>
        <input {...getInputProps({ disabled: isUploading })} />
        Drop files here!
      </div>
      <Button
        onClick={() => startUpload(files)}
        disabled={files.length <= 0 || isUploading}
      >
        Upload {files.length} files
      </Button>
      <ErrorAlert error={error} onAccept={() => setError(undefined)} />
    </div>
  )
}
