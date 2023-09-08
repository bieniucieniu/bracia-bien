"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import Slider from "../Slider"
import { InferInsertModel } from "drizzle-orm"
import { imagesData } from "@/db/schema/imagesData"

export default function Banner({
  data,
}: {
  data: (InferInsertModel<typeof imagesData> & { url?: string })[]
}) {
  const [visible, setVisible] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 3000)
  }, [data])

  return (
    <>
      <div
        onClick={() => setVisible(true)}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Image
          src="/logo.png"
          priority
          className={"object-contain transition-opacity m-auto"}
          alt="logo"
          width={638}
          height={189}
        />
      </div>
      {visible && data.length > 0 ? (
        <Slider
          autoSlide={10000}
          className="z-10 max-h-full"
          renderer={(i) => {
            const d = data[i]
            if (!d.url) return null
            return (
              <Image
                alt={d.alt ?? `image-${i}`}
                src={d.url}
                fill
                className="object-contain"
              />
            )
          }}
          length={data.length}
        />
      ) : null}
    </>
  )
}
