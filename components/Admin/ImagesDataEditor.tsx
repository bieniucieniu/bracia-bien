"use client"
import Image from "next/image"
import { Button } from "../ui/button"
import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"
import { imagesCategorieEnum, imagesData } from "@/db/schema/imagesData"

import { Label } from "../ui/label"
import { twJoin } from "tailwind-merge"
import { Input } from "../ui/input"
import { updateImagesData, deleteImagesData } from "@/db/clientApi"
import { toPl } from "@/lib/utils"
import { InferInsertModel } from "drizzle-orm"
import { useAdminContext } from "./AdminContext"

interface ImgData extends InferInsertModel<typeof imagesData> {
  url?: string | undefined
}

export default function ImageDataEditor() {
  const { imagesData } = useAdminContext()
  const [imageData, setImageData] = useState<
    (ImgData & {
      newAlt?: string
      newCategorie?: ImgData["categorie"]
      delete?: boolean
    })[]
  >(() => structuredClone(imagesData))

  function deleteData(key: ImgData["key"]) {
    const newData = imageData.map((e) => {
      if (e.key === key) {
        if (e.delete === true) return { ...e, delete: undefined }
        return { ...e, delete: true }
      }
      return e
    })

    setImageData(newData)
  }
  function SetNewAlt(key: ImgData["key"], alt: string) {
    const newData = imageData.map((e) => {
      if (e.key === key) {
        if (alt === e.alt || alt === e.newAlt)
          return { ...e, newAlt: undefined }
        return { ...e, newAlt: alt }
      }
      return e
    })

    setImageData(newData)
  }
  function SetNewCategorie(
    key: ImgData["key"],
    categorie: ImgData["categorie"],
  ) {
    const newData = imageData.map((e) => {
      if (e.key === key) {
        if (categorie === e.categorie) return { ...e, newCategorie: undefined }
        return { ...e, newCategorie: categorie }
      }
      return e
    })

    setImageData(newData)
  }
  const [altEdit, setAltEdit] = useState<string>("")

  function resetChanges() {
    setImageData(imagesData)
  }

  const [uploading, setUploading] = useState<boolean>(false)

  function submitChanges() {
    setUploading(true)

    const toDelete = imageData
      .filter((e) => e.delete === true)
      .map((e) => e.key)
    const toUpdateCategorie = imagesCategorieEnum.enumValues.map(
      (categorie) => {
        const keys = imageData
          .filter(
            (e) =>
              e.newCategorie === categorie && e.newCategorie !== e.categorie,
          )
          .map((e) => e.key)
        return { keys, change: { categorie } }
      },
    )
    const toUpdateAlt = imageData
      .filter((e) => e.newAlt && e.newAlt !== e.alt)
      .map((e) => ({
        keys: [e.key],
        change: { alt: e.newAlt },
      }))

    updateImagesData(
      toUpdateCategorie.length || toUpdateAlt.length
        ? [...toUpdateCategorie, ...toUpdateAlt]
        : undefined,
      (res) => {
        setUploading(true)
        if (res instanceof Response && res.status === 200) {
          const newData: ImgData[] = imageData.map((e) => ({
            ...e,
            alt: e.newAlt ?? e.alt,
            categorie: e.newCategorie ?? e.categorie,
            newAlt: undefined,
            newCategorie: undefined,
          }))

          setImageData(newData)
        } else {
          console.log(res)
        }
        setUploading(false)
      },
    )
    deleteImagesData(toDelete.length ? toDelete : undefined, (res) => {
      setUploading(true)
      if (res instanceof Response && res.status === 200) {
        const newData: ImgData[] = imageData.filter((e) => !e.delete)

        setImageData(newData)
      } else {
        console.log(res)
      }
      setUploading(false)
    })
  }

  if (!imagesData || imageData.length <= 0) return "no imgs"

  return (
    <Card className="flex flex-col w-fit m-auto" id="imgSel">
      <CardHeader>
        <CardTitle>Select Module</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-row flex-wrap p-2 gap-2">
          {imageData.map(
            ({ url, key, alt, categorie, newAlt, delete: toDelete }) => (
              <li
                className="flex flex-col gap-2 overflow-hidden rounded-xl shadow-md"
                key={key}
              >
                {url ? (
                  <Image
                    alt={alt ?? ""}
                    src={url ?? ""}
                    width={400}
                    height={300}
                    className={twJoin("object-contain h-auto transition")}
                  />
                ) : (
                  `invalid url ${url}`
                )}

                <span className="truncate">{key}</span>
                <section className="flex flex-col items-start gap-y-4 px-2 pb-2">
                  {categorie ? null : "error in categorie"}
                  <RadioGroup
                    disabled={uploading}
                    defaultValue={categorie}
                    onValueChange={(e: NonNullable<ImgData["categorie"]>) => {
                      SetNewCategorie(key, e)
                    }}
                    className="flex flex-row flex-wrap"
                  >
                    {imagesCategorieEnum.enumValues.map((str, i) => (
                      <div
                        key={str}
                        className={twJoin(
                          "flex items-center space-x-2 rounded-xl pr-1",
                          categorie === str
                            ? "outline outline-2 outline-offset-2 outline-lime-300"
                            : "",
                        )}
                      >
                        <RadioGroupItem value={str} id={"r-" + i} />
                        <Label htmlFor={"r-" + i}>{toPl(str)}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  <section className="flex gap-x-3">
                    <Popover
                      modal
                      onOpenChange={() => setAltEdit(newAlt ?? alt ?? "")}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          disabled={uploading}
                          variant={newAlt ? "green" : "outline"}
                        >
                          edit alt
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="flex flex-col">
                        <Input
                          disabled={uploading}
                          type="text"
                          onChange={(e) => setAltEdit(e.target.value)}
                          value={altEdit ?? alt}
                        />
                        <div className="flex flex-row gap-x-2 justify-end mt-2">
                          <Button
                            variant={
                              newAlt === altEdit ? "destructive" : "default"
                            }
                            onClick={() => {
                              SetNewAlt(key, altEdit)
                            }}
                          >
                            {newAlt === altEdit ? "reset" : "set"}
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Button
                      variant={toDelete ? "destructive" : "default"}
                      onClick={() => {
                        deleteData(key)
                      }}
                      className="outline outline-2 outline-offset-2 outline-red-500"
                    >
                      delete
                    </Button>
                  </section>
                </section>
              </li>
            ),
          )}
        </ul>
      </CardContent>
      <CardFooter className="justify-end">
        <div className="sticky bottom-2 flex gap-1 bg-white shadow-sm rounded-xl p-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button disabled={uploading} variant="green">
                submit changes
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Delete {imageData.filter((e) => e.delete).length} files?
                  <br />
                  Update categorie of{" "}
                  {imageData.filter((e) => e.newCategorie).length} files?
                  <br />
                  Update alt of {imageData.filter((e) => e.alt).length} files?
                </AlertDialogTitle>
                <AlertDialogDescription>are you sure</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={submitChanges}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button disabled={uploading} variant="destructive">
                reset changes
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  reset
                  <br />
                  delete {imageData.filter((e) => e.delete).length} files?
                  <br />
                  Update categorie of{" "}
                  {imageData.filter((e) => e.newCategorie).length} files?
                  <br />
                  Update alt of {imageData.filter((e) => e.newAlt).length}{" "}
                  files?
                </AlertDialogTitle>
                <AlertDialogDescription>are you sure</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={resetChanges}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button asChild>
            <Link href="#imgSel">go to top</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
