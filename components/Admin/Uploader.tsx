"use client"

import { generateReactHelpers } from "@uploadthing/react/hooks"

import type { FileRouter } from "@/lib/uploadthing"
import { Button } from "../ui/button"

import { useDropzone } from "react-dropzone"
import type { FileWithPath } from "react-dropzone"
import { useCallback, useState } from "react"
import ErrorAlert from "../ErrorAlert"
import { twMerge } from "tailwind-merge"
import { Progress } from "../ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { addImagesData } from "@/db/clientApi"
import {
  imagesCategorieEnum,
  imagesData as dbImageDataSchema,
} from "@/db/schema/imagesData"
import { InferInsertModel } from "drizzle-orm"
import { toPl } from "@/lib/utils"
import { useAdminContext } from "./AdminContext"

const { useUploadThing } = generateReactHelpers<FileRouter>()

export function Uploader({
  endpoint,
  className,
}: {
  endpoint?: keyof FileRouter
  className?: string
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

  const { imagesData, setImagesData } = useAdminContext()

  const { isUploading, startUpload } = useUploadThing(endpoint ?? "image", {
    onClientUploadComplete: (e) => {
      if (Array.isArray(e)) {
        const items: Parameters<typeof addImagesData>[0] = e.map(({ key }) => ({
          key,
          categorie: categorie,
          alt,
        }))
        addImagesData(items)

        e.forEach(({ key, url }) => {
          imagesData.set(key, {
            key,
            src: url,
            categorie,
            alt,
            change: {},
          })
        })

        setImagesData(new Map())
      }
      setFiles([])
    },
    onUploadError: (error) => {
      setError(error)
    },
    onUploadProgress: (p) => {
      setProgress(p)
    },
  })
  type Categorie = NonNullable<
    InferInsertModel<typeof dbImageDataSchema>["categorie"]
  >

  const [alt, setAlt] = useState<string>()
  const [categorie, setCategorie] = useState<Categorie>("gallery")

  return (
    <div className={twMerge("flex flex-col items-center", className)}>
      <div
        className={twMerge(
          "flex flex-col gap-y-4 items-center",
          isUploading ? "blur-sm" : "",
        )}
      >
        <div
          {...getRootProps({
            className:
              "border-2 border-dashed border-black rounded-xl p-5 min-w-[300px] lg:min-w-[400px] lg:min-h-[300px] max-w-full max-h-full",
          })}
        >
          <input {...getInputProps({ disabled: isUploading })} />
          <span className="font-semibold text-gray-700">
            Upuść pliki tutaj lub kliknij
          </span>
        </div>

        <Input
          type="text"
          placeholder="alt"
          value={alt}
          disabled={isUploading}
          onChange={(e) => setAlt(e.target.value)}
        />
        <RadioGroup
          defaultValue={categorie}
          onValueChange={(e: Categorie) => setCategorie(e)}
          disabled={isUploading}
          className="flex flex-row"
        >
          {imagesCategorieEnum.enumValues.map((str) => (
            <div key={str} className="flex items-center space-x-2">
              <RadioGroupItem value={str} id="r1" />
              <Label htmlFor="r1">{toPl(str)}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      {isUploading ? (
        <Progress
          value={progress}
          className="w-full h-9 rounded-md max-w-xs mt-6"
        />
      ) : (
        <Button
          onClick={() => startUpload(files)}
          disabled={files.length <= 0 || isUploading}
          className="w-full max-w-xs mt-6"
        >
          Przekaż {files.length} pliki
        </Button>
      )}
      <ErrorAlert error={error} onAccept={() => setError(undefined)} />
    </div>
  )
}
