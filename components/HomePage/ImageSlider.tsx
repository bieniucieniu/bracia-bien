"use client"
import Image from "next/image"
import Slider from "../Slider"
import { InferInsertModel } from "drizzle-orm"
import { imagesData } from "@/db/schema/imagesData"

export function ImageSlider({
  data,
  className,
  width,
  height,
}: {
  data: (InferInsertModel<typeof imagesData> & { src?: string })[]
  className?: string
  width?: number
  height?: number
}) {
  if (!data.length) return <div></div>

  return (
    <Slider
      className={className}
      renderer={(i) => {
        const d = data[i]
        if (!d.src) return null
        return (
          <Image
            alt={d.alt ?? `image-${i}`}
            src={d.src}
            width={width ?? 1920}
            height={height ?? 800}
            className="object-contain rounded-lg max-h-full w-auto m-auto"
          />
        )
      }}
      length={data.length}
    />
  )
}
