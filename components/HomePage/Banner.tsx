"use client"
import Image from "next/image"
import Slider from "../Slider"
import { InferInsertModel } from "drizzle-orm"
import { imagesData } from "@/db/schema/imagesData"

export default function Banner({
  data,
}: {
  data: (InferInsertModel<typeof imagesData> & { url?: string })[]
}) {
  return data.length > 0 ? (
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
  ) : null
}
