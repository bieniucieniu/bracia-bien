"use client"
import Image from "next/image"
import Slider from "../Slider"

export function ImageSlider({
  data,
  className,
  width,
  height,
}: {
  data: { src?: string }[]
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

        const alt = d.src.split("_")[0]
        return (
          <div className="h-full w-full flex justify-center items-center">
            <Image
              alt={alt ?? `image-${i}`}
              src={d.src}
              width={width ?? 1920}
              height={height ?? 800}
              className="object-contain rounded-lg max-h-full w-auto"
            />
          </div>
        )
      }}
      length={data.length}
    />
  )
}
