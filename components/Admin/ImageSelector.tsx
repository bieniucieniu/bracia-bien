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
import { categorie as categorieEnum } from "@/db/schema"

import { Label } from "../ui/label"
import { ImgData } from "./AdminDashboard"
import { twJoin } from "tailwind-merge"
import { Input } from "../ui/input"
import { patchImagesData } from "@/db/clientApi"
import { setUncaughtExceptionCaptureCallback } from "process"
import { Catamaran } from "next/font/google"

export default function ImageSelesctor({ imgsData }: { imgsData: ImgData[] }) {
  const [imageData, setImageData] = useState<
    (ImgData & {
      newAlt?: string
      newCategorie?: ImgData["categorie"]
      delete?: boolean
    })[]
  >(imgsData)

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
    setImageData(imgsData)
  }

  const [uploading, setUploading] = useState<boolean>(false)

  function submitChanges() {
    setUploading(true)

    const toDelete = imageData.filter((e) => e.delete).map((e) => e.key)
    const toUpdateCategorie = categorieEnum.enumValues.map((categorie) => {
      const keys = imageData
        .filter(
          (e) => e.newCategorie === categorie && e.newCategorie !== e.categorie,
        )
        .map((e) => e.key)
      return { keys, update: { categorie } }
    })
    const toUpdateAlt = imageData
      .filter((e) => e.newAlt && e.newAlt !== e.alt)
      .map((e) => ({
        keys: [e.key],
        update: { alt: e.newAlt },
      }))

    if (
      toUpdateCategorie.length > 0 &&
      toDelete.length > 0 &&
      toUpdateAlt.length > 0
    )
      patchImagesData(
        {
          updateImages: [...toUpdateCategorie, ...toUpdateAlt],
          deleteImages: toDelete,
        },
        (res) => {
          if (!(res instanceof Response) || res.status !== 200) {
            console.log(res)
          } else {
            const newData: ImgData[] = imageData
              .filter((e) => !e.delete)
              .map((e) => ({
                ...e,
                alt: e.newAlt ?? e.alt,
                categorie: e.newCategorie ?? e.categorie,
                newAlt: null,
                newCategorie: null,
              }))

            setImageData(newData)
          }
          setUploading(false)
        },
      )
    else {
      setUploading(false)
      console.log("nothing is changed")
    }
  }

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
                <Image
                  alt={alt ?? ""}
                  src={url ?? ""}
                  width={400}
                  height={300}
                  className={twJoin("object-contain h-auto transition")}
                />

                <span>{key}</span>
                <section className="flex justify-around flex-wrap items-center pb-2">
                  {!categorie ? (
                    "error"
                  ) : (
                    <RadioGroup
                      disabled={uploading}
                      defaultValue={categorie}
                      onValueChange={(e: NonNullable<ImgData["categorie"]>) => {
                        SetNewCategorie(key, e)
                      }}
                      className="flex flex-row"
                    >
                      {categorieEnum.enumValues.map((str, i) => (
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
                          <Label htmlFor={"r-" + i}>{str}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
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
              </li>
            ),
          )}
        </ul>
      </CardContent>
      <CardFooter className="justify-end">
        <div className="sticky bottom-2 flex gap-1 bg-white shadow-sm rounded-xl p-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button disabled={uploading} variant="destructive">
                submit changes
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Delete {imgsData.length - imageData.length} files?
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
                  delete {imgsData.length - imageData.length} files?
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
