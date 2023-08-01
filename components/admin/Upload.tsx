"use client"

import { generateReactHelpers } from "@uploadthing/react/hooks"

import type { FileRouter } from "@/lib/uploadthing"
import { Button } from "../ui/button"

import { useDropzone, type FileWithPath } from "react-dropzone"
import { useCallback, useState } from "react"
import ErrorAlert from "../ErrorAlert"
import { twMerge } from "tailwind-merge"

const { useUploadThing } = generateReactHelpers<FileRouter>()

export function UploadZone({
  endpoint,
  className,
  height = 300,
  width = 400,
}: {
  endpoint?: keyof FileRouter
  className?: string
  width?: number | string
  height?: number | string
}) {
  const [files, setFiles] = useState<File[]>([])
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      const f = acceptedFiles.map((e) => {
        console.log(e)
        if (e.name.includes(" ")) {
          return new File([e], e.name.replaceAll(" ", "_"), {
            type: e.type,
          })
        }
        return e
      })

      setFiles([...files, ...f])
    },
    [files],
  )
  const [error, setError] = useState<Error | undefined>(undefined)

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
    <div
      className={twMerge(
        "flex flex-col gap-2 justify-stretch items-center",
        className,
      )}
    >
      <div
        {...getRootProps({
          style: {
            width,
            height,
          },
          className: `border-2 border-dashed border-black rounded-xl p-5 w-fill h-fill`,
        })}
      >
        <input {...getInputProps({ disabled: isUploading })} />
        <span className="font-semibold text-gray-700">
          Drop files here or click
        </span>
      </div>
      <Button
        onClick={() => startUpload(files)}
        disabled={files.length <= 0 || isUploading}
        className="self-center"
      >
        Upload {files.length} files
      </Button>
      <ErrorAlert error={error} onAccept={() => setError(undefined)} />
    </div>
  )
}
