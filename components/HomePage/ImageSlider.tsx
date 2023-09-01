"use client"
import Image from "next/image"
import Slider from "../Slider"
import { InferInsertModel } from "drizzle-orm"
import { imagesData } from "@/db/schema/imagesData"

export function ImageSlider({
  data,
  className,
}: {
  data: (InferInsertModel<typeof imagesData> & { url: string })[]
  className?: string
}) {
  if (!data.length) return <div></div>

  return (
    <Slider
      className={className}
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
  )
}
