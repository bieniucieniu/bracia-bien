"use client"
import Image from "next/image"
import { Button } from "../ui/button"
import { useCallback, useState } from "react"
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

import { patchImagesData } from "@/db/clientApi"
import { Label } from "../ui/label"
import { ImgData } from "./AdminDashboard"
import { twJoin } from "tailwind-merge"
import { Input } from "../ui/input"

export default function ImageSelesctor({ imgsData }: { imgsData: ImgData[] }) {
  const [toDelete, setToDelete] = useState<(ImgData["key"] | null)[]>(
    Array.from({ length: imgsData.length }, () => null),
  )
  const [toUpdateCategorie, setToUpdateCategorie] = useState<
    ({
      key: ImgData["key"]
      categorie: ImgData["categorie"]
    } | null)[]
  >(Array.from({ length: imgsData.length }, () => null))

  const [altEdit, setAltEdit] = useState<string>("")

  const patchSelected = () => {
    const filteredDelete = toDelete.filter((e) => Boolean(e)) as string[]
    const filteredUpdate: Parameters<
      typeof patchImagesData
    >[0]["updateImages"] = categorieEnum.enumValues.map((categorie) => {
      return {
        keys: toUpdateCategorie
          .filter((e) => {
            if (!e) return false
            return e.categorie === categorie
          })
          .map((e) => {
            return e!.key
          }) as string[],
        update: { categorie, alt: null },
      }
    })

    filteredUpdate.push()

    patchImagesData(
      { deleteImages: filteredDelete, updateImages: filteredUpdate },
      (res) => {
        if (res.deleted.error) console.log(res.updated.error)
        if (res.updated.error) console.log(res.updated.error)
      },
    )
  }
  return (
    <Card className="flex flex-col w-fit m-auto" id="imgSel">
      <CardHeader>
        <CardTitle>Select Module</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-row flex-wrap p-2 gap-2">
          {imgsData.map(({ url, key, alt, categorie }, idx) => (
            <li
              className="flex flex-col gap-2 overflow-hidden rounded-xl shadow-md"
              key={key}
            >
              <Image
                alt={alt ?? ""}
                src={url ?? ""}
                width={400}
                height={300}
                className={twJoin(
                  "object-contain h-auto transition",
                  toDelete[idx] ? "blur-sm" : "",
                )}
              />

              <section className="flex justify-around items-center pb-2">
                {!categorie ? (
                  "error"
                ) : (
                  <RadioGroup
                    defaultValue={categorie}
                    onValueChange={(e: NonNullable<ImgData["categorie"]>) => {
                      if (e === categorie) toUpdateCategorie[idx] = null
                      else
                        toUpdateCategorie[idx] = {
                          key: key,
                          categorie: e,
                        }
                      setToUpdateCategorie([...toUpdateCategorie])
                    }}
                    className="flex flex-row"
                  >
                    {categorieEnum.enumValues.map((str, i) => (
                      <div
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
                <Popover onOpenChange={() => setAltEdit(alt ?? "")}>
                  <PopoverTrigger asChild>
                    <Button variant="outline">edit alt</Button>
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col">
                    <Input
                      type="text"
                      value={altEdit}
                      onChange={(e) => setAltEdit(e.target.value)}
                    />
                    <div className="flex flex-row gap-x-2 justify-end mt-2">
                      <Button
                        onClick={() => {
                          patchImagesData({
                            updateImages: [
                              {
                                keys: [key],
                                update: {
                                  categorie: null,
                                  alt: altEdit,
                                },
                              },
                            ],
                          })

                          setAltEdit(alt ?? "")
                        }}
                      >
                        set
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
                <Button
                  variant={toDelete[idx] ? "destructive" : "default"}
                  onClick={() => {
                    toDelete[idx] = toDelete[idx] ? null : key
                    setToDelete([...toDelete])
                  }}
                  className="outline outline-2 outline-offset-2 outline-red-500"
                >
                  delete
                </Button>
              </section>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="justify-end">
        <div className="sticky bottom-2 flex gap-1 bg-white shadow-sm rounded-xl p-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={toDelete.length <= 0}>
                set changes
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Delete {toDelete.filter((e) => Boolean(e)).length} files?
                  Update categorie of{" "}
                  {toUpdateCategorie.filter((e) => Boolean(e)).length} files?
                </AlertDialogTitle>
                <AlertDialogDescription>are you sure</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={patchSelected}>
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
