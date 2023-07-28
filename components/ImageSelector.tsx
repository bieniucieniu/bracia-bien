"use client"

import { edgeConfigType } from "@/lib/edgeconfig"
import Image from "next/image"
import { Button } from "./ui/button"

export default function ImageSelesctor({
  imgs,
  config,
}: {
  imgs: { url: string; key: string }[]
  config: edgeConfigType
}) {
  return (
    <ul className="w-full h-full flex flex-row flex-wrap p-2 gap-2">
      {imgs.map((img) => (
        <li className="flex flex-col gap-2">
          <Image
            key={img.key}
            alt={img.key}
            src={img.url}
            width={400}
            height={400}
            className="object-contain"
          />
          <section className="flex justify-around">
            {config.mainImgKeys?.includes(img.key) ? (
              <Button variant="destructive">usun z main</Button>
            ) : (
              <Button>dodaj do main</Button>
            )}
            {config.currentImgKeys?.includes(img.key) ? (
              <Button variant="destructive">usun z current</Button>
            ) : (
              <Button>dodaj do current</Button>
            )}
          </section>
        </li>
      ))}
    </ul>
  )
}
