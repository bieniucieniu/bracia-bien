"use client"

import { edgeConfigType } from "@/lib/edgeconfig"
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

export default function ImageSelesctor({
  imgsData,
  config,
}: {
  imgsData: { url: string; key: string }[]
  config: edgeConfigType
}) {
  const [main, setMain] = useState<string[]>(config.mainImgKeys ?? [])
  const [current, setCurrent] = useState<string[]>(config.currentImgKeys ?? [])

  const addDeleteMain = useCallback(
    (key: string) => {
      console.log(key)
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

  return (
    <Card className="flex flex-col w-fit m-auto max-w-6xl">
      <CardHeader>
        <CardTitle>Select Module</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="w-full h-full flex flex-row flex-wrap p-2 gap-2">
          {imgsData.map((img) => (
            <li className="flex flex-col gap-2" key={img.key}>
              <Image
                alt={img.key}
                src={img.url}
                width={400}
                height={300}
                className="object-contain"
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
      <CardFooter>
        <Button>Set Selected</Button>
      </CardFooter>
    </Card>
  )
}
