"use client"

import { generateReactHelpers } from "@uploadthing/react/hooks"

import type { FileRouter } from "@/lib/uploadthing"
import { Button } from "../ui/button"

import { useDropzone, type FileWithPath } from "react-dropzone"
import { useCallback, useState } from "react"
import ErrorAlert from "../ErrorAlert"
import { twMerge } from "tailwind-merge"
import { Progress } from "../ui/progress"
import { Textarea } from "../ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useSession } from "next-auth/react"

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
  const [progress, setProgress] = useState(0)
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
      setProgress(p)
    },
  })

  const [alt, setAlt] = useState<string>()
  const [categorie, setCategorie] = useState<string>()

  return (
    <div className={twMerge("flex flex-col gap-2 items-center", className)}>
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
      <Input
        type="text"
        placeholder="alt"
        value={alt}
        disabled={isUploading}
        onChange={(e) => setAlt(e.target.value)}
      />
      <div className="flex flex-row gap-x-4">
        {isUploading ? (
          <Progress value={progress} />
        ) : (
          <Button
            onClick={() => startUpload(files)}
            disabled={files.length <= 0 || isUploading}
            className="self-center"
          >
            Upload {files.length} files
          </Button>
        )}
        <ErrorAlert error={error} onAccept={() => setError(undefined)} />
        <RadioGroup
          defaultValue="else"
          onValueChange={(e) => setCategorie(e)}
          disabled={isUploading}
          className="flex flex-row"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="main" id="r1" />
            <Label htmlFor="r1">main</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="current" id="r2" />
            <Label htmlFor="r2">current</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="else" id="r3" />
            <Label htmlFor="r3">else</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
