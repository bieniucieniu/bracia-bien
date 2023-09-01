"use client"
import Image from "next/image"
import Slider from "../Slider"
import { InferInsertModel } from "drizzle-orm"
import { imagesData } from "@/db/schema/imagesData"

export function ImageSlider({
  data,
  className,
}: {
  data: (InferInsertModel<typeof imagesData> & { url?: string })[]
  className?: string
}) {
  if (!data.length) return <div></div>

  return (
    <Slider
      className={className}
      renderer={(i) => {
        const d = data[i]
        if (!d.url) return null
        return (
          <Image
            alt={d.alt ?? `image-${i}`}
            src={d.url}
            width={1920}
            height={800}
          />
        )
      }}
      length={data.length}
    />
  )
}
