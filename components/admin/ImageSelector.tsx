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

export default function ImageSelesctor({
  imgsData,
  config,
}: {
  imgsData: { url: string; key: string }[]
  config: z.infer<typeof edgeConfigSchema>
}) {
  const [main, setMain] = useState<string[]>(config.mainImgKeys ?? [])
  const [current, setCurrent] = useState<string[]>(config.currentImgKeys ?? [])

  const addDeleteMain = useCallback(
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
  const addDeleteCurrent = useCallback(
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

  const setSelected = () => {
    setConfig({ mainImgKeys: main, currentImgKeys: current }, async (res) => {
      const body = await res.json()
      if (body.error) {
        console.log(body)
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
                className="object-contain h-auto"
              />
              <section className="flex justify-around">
                <Button
                  variant={main.includes(img.key) ? "destructive" : "default"}
                  onClick={() => addDeleteMain(img.key)}
                >
                  main
                </Button>
                <Button
                  variant={
                    current.includes(img.key) ? "destructive" : "default"
                  }
                  onClick={() => addDeleteCurrent(img.key)}
                >
                  current
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
