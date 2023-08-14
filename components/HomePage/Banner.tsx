"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import Slider from "../Slider"
import { InferModel } from "drizzle-orm"
import { imagesData } from "@/db/schema"

export default function Banner({
  data,
}: {
  data: (InferModel<typeof imagesData> & { url: string })[]
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
          className="z-10"
          renderer={(i) => (
            <Image
              alt={data[i].alt ?? `image-${i}`}
              src={data[i].url}
              width={1920}
              height={800}
            />
          )}
          length={data.length}
        />
      ) : null}
    </>
  )
}
