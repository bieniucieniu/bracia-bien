"use client"

import { edgeConfigSchema } from "@/lib/edgeconfig"
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
import Link from "next/link"
import { setConfig } from "@/lib/edgeconfig"
import { z } from "zod"
import { deleteFiles } from "@/utils/uploadthing"

import { useRouter } from "next/navigation"
export default function ImageSelesctor({
  imgsData,
  config,
}: {
  imgsData: { url: string; key: string }[]
  config: z.infer<typeof edgeConfigSchema>
}) {
  const [main, setMain] = useState<string[]>(config.mainImgKeys ?? [])
  const [current, setCurrent] = useState<string[]>(config.currentImgKeys ?? [])
  const [toDelete, setToDelete] = useState<string[]>([])
  const router = useRouter()

  const addRemoveMain = useCallback(
    (key: string) => {
      if (main.includes(key)) {
        const newItems = main.filter((k) => k !== key)
        setMain(newItems)
        return
      } else {
        main.unshift(key)
        setMain([...main])
      }
    },
    [main],
  )
  const addRemoveCurrent = useCallback(
    (key: string) => {
      if (current.includes(key)) {
        const newItems = current.filter((k) => k !== key)
        setCurrent(newItems)
        return
      } else {
        current.unshift(key)
        setCurrent([...current])
      }
    },
    [current],
  )

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

  const setSelected = () => {
    setConfig({ mainImgKeys: main, currentImgKeys: current }, async (res) => {
      const body = await res.json()
      if (body.error) throw new Error(body.error)
    })
  }
  const deleteSelected = () => {
    deleteFiles(toDelete, async (res) => {
      const body = await res.json()
      if (body.success) {
        setToDelete([])
        router.refresh()
      }
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
          {imgsData.map((img) => (
            <li className="flex flex-col gap-2" key={img.key}>
              <Image
                alt={img.key}
                src={img.url}
                width={400}
                height={300}
                className="object-contain h-auto rounded-t-xl"
              />
              <section className="flex justify-around pb-2 rounded-b-xl shadow-md">
                <Button
                  variant={main.includes(img.key) ? "green" : "default"}
                  onClick={() => addRemoveMain(img.key)}
                >
                  main
                </Button>
                <Button
                  variant={current.includes(img.key) ? "green" : "default"}
                  onClick={() => addRemoveCurrent(img.key)}
                >
                  current
                </Button>
                <Button
                  variant={
                    toDelete.includes(img.key) ? "destructive" : "default"
                  }
                  onClick={() => addRemoveToDelete(img.key)}
                  className="outline outline-2 outline-offset-2 outline-red-500"
                >
                  to delete
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
