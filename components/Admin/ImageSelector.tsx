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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"
import { deleteFiles } from "@/utils/uploadthing"

import { useRouter } from "next/navigation"
import { patchImagesData } from "@/utils/db"
import { Label } from "../ui/label"
import { ImgData } from "./AdminDashboard"

export default function ImageSelesctor({ imgsData }: { imgsData: ImgData[] }) {
  const [toDelete, setToDelete] = useState<string[]>([])
  const [toUpdate, setToUpdate] = useState<ImgData["categorie"][]>(
    Array.from({ length: imgsData.length }),
  )
  const router = useRouter()

  const addRemoveToDelete = useCallback(
    (key: string) => {
      if (toDelete.includes(key)) {
        const newItems = toDelete.filter((k) => k !== key)
        setToDelete(newItems)
      } else {
        toDelete.push(key)
        setToDelete([...toDelete])
      }
    },
    [toDelete],
  )

  const setSelected = () => {}

  const deleteSelected = () => {
    deleteFiles(toDelete, async (res) => {
      const body = await res.json()
      if (body.success) {
        setToDelete([])
        router.refresh()
      }
    })

    patchImagesData({ deleteImages: toDelete }, (res) => {
      res.map((e) => e.error && console.log(e))
    })
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
            <li className="flex flex-col gap-2" key={key}>
              <Image
                alt={alt || ""}
                src={url || ""}
                width={400}
                height={300}
                className="object-contain h-auto rounded-t-xl"
              />

              {!categorie ? (
                "error"
              ) : (
                <RadioGroup
                  defaultValue={categorie}
                  onValueChange={(e: NonNullable<ImgData["categorie"]>) => {
                    if (e === categorie) toUpdate[idx] = null
                    else toUpdate[idx] = e
                    setToUpdate([...toUpdate])
                  }}
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
              )}

              <section className="flex justify-around items-center pb-2 rounded-b-xl shadow-md">
                <Button
                  variant={toDelete.includes(key) ? "destructive" : "default"}
                  onClick={() => addRemoveToDelete(key)}
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
                delete Selected
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Delete {toDelete.length} files?
                </AlertDialogTitle>
                <AlertDialogDescription>are you sure</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deleteSelected}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>Set Selected</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Set Selected</AlertDialogTitle>
                <AlertDialogDescription>are you sure</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={setSelected}>
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
