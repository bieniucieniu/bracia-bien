"use client"
import Image from "next/image"
import Slider from "../Slider"

export function ImageSlider({
  urls,
  className,
}: {
  urls: string[]
  className?: string
}) {
  if (!urls.length) return <div></div>

  return (
    <Slider
      className={className}
      renderer={(i) => (
        <Image alt={`image-${i}`} src={urls[i]} width={1920} height={800} />
      )}
      length={urls.length}
    />
  )
}
