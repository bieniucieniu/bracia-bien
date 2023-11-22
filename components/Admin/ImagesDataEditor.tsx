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
import { imagesCategorieEnum } from "@/db/schema/imagesData"
import type { ImageData } from "./AdminContext"

import { Label } from "@/components/ui/label"
import { twJoin } from "tailwind-merge"
import { Input } from "@/components/ui/input"
import { updateImagesData, deleteImagesData } from "@/db/clientApi"
import { toPl } from "@/lib/utils"
import { useAdminContext } from "./AdminContext"

export default function ImageDataEditor() {
  const { imagesData, setImagesData } = useAdminContext()

  function deleteData(key: string) {
    const d = imagesData.get(key)

    if (!d) return
    d.change.delete = true

    setImagesData(new Map(imagesData))
  }
  function SetNewAlt(key: string, alt: string) {
    const d = imagesData.get(key)

    if (!d) return
    d.change.alt = alt

    setImagesData(new Map(imagesData))
  }

  function SetNewCategorie(key: string, categorie: ImageData["categorie"]) {
    const d = imagesData.get(key)

    if (!d) return
    d.change.categorie = categorie

    setImagesData(new Map(imagesData))
  }
  const [altEdit, setAltEdit] = useState<string>("")

  function resetChanges() {
    imagesData.forEach((value) => {
      value.change = {
        categorie: undefined,
        delete: undefined,
        alt: undefined,
      }
    })

    setImagesData(new Map(imagesData))
  }

  const [uploading, setUploading] = useState<boolean>(false)

  function submitChanges() {
    setUploading(true)

    const toDelete: string[] = []
    const toUpdate: {
      keys: string[]
      change: {
        categorie?: ImageData["categorie"]
        alt?: string
      }
    }[] = []

    imagesData.forEach((value, key) => {
      if (value.change?.delete) toDelete.push(key)
      if (value.change?.categorie || value.change?.alt)
        toUpdate.push({
          keys: [key],
          change: value.change,
        })
    })

    updateImagesData(toUpdate.length ? toUpdate : undefined, (res) => {
      setUploading(true)
      if (res instanceof Response && res.status === 200) {
        imagesData.forEach((e, key) => {
          imagesData.set(key, {
            ...e,
            alt: e.change?.alt ?? e.alt,
            categorie: e.change?.categorie ?? e.categorie,
            change: {},
          })
        })
        setImagesData(new Map(imagesData))
      } else {
        console.log(res)
      }
      setUploading(false)
    })
    deleteImagesData(toDelete.length ? toDelete : undefined, (res) => {
      setUploading(true)
      if (res instanceof Response && res.status === 200) {
        imagesData.forEach((e, key) => {
          if (e.change?.delete === true) {
            imagesData.delete(key)
          }
        })
        setImagesData(new Map(imagesData))
      } else {
        console.log(res)
      }
      setUploading(false)
    })
  }

  if (!imagesData || [...imagesData.keys()].length <= 0) return "no imgs"

  return (
    <Card className="flex flex-col w-fit m-auto" id="imgSel">
      <CardHeader>
        <CardTitle>Select Module</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-row flex-wrap p-2 gap-2">
          {[...imagesData.values()].map(
            ({ src, key, alt, categorie, change }) => (
              <li
                className="flex flex-col gap-2 overflow-hidden rounded-xl shadow-md"
                key={key}
              >
                {src ? (
                  <Image
                    alt={alt ?? ""}
                    src={src}
                    width={400}
                    height={300}
                    className={twJoin("object-contain h-auto transition")}
                  />
                ) : (
                  `invalid src path ${src}`
                )}

                <span className="truncate">{key}</span>
                <section className="flex flex-col items-start gap-y-4 px-2 pb-2">
                  {categorie ? null : "error in categorie"}
                  <RadioGroup
                    disabled={uploading}
                    defaultValue={categorie}
                    onValueChange={(e: NonNullable<ImageData["categorie"]>) => {
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
                      onOpenChange={() => setAltEdit(change?.alt ?? alt ?? "")}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          disabled={uploading}
                          variant={change?.alt ? "green" : "outline"}
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
                              change?.alt === altEdit
                                ? "destructive"
                                : "default"
                            }
                            onClick={() => {
                              SetNewAlt(key, altEdit)
                            }}
                          >
                            {change?.alt === altEdit ? "reset" : "set"}
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Button
                      variant={change?.delete ? "destructive" : "default"}
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
                  Delete of{" "}
                  {
                    [...imagesData.values()].filter((e) => e.change?.delete)
                      .length
                  }{" "}
                  files?
                  <br />
                  Update categorie of{" "}
                  {
                    [...imagesData.values()].filter((e) => e.change?.categorie)
                      .length
                  }{" "}
                  files?
                  <br />
                  Update alt of{" "}
                  {[...imagesData.values()].filter((e) => e.alt).length} files?
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
                  Delete of{" "}
                  {
                    [...imagesData.values()].filter((e) => e.change?.delete)
                      .length
                  }{" "}
                  files?
                  <br />
                  Update categorie of{" "}
                  {
                    [...imagesData.values()].filter((e) => e.change?.categorie)
                      .length
                  }{" "}
                  files?
                  <br />
                  Update alt of{" "}
                  {[...imagesData.values()].filter((e) => e.alt).length} files?
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
