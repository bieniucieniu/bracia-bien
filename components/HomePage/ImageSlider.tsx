"use client"
import Image from "next/image"
import Slider from "../Slider"

export function ImageSlider({ urls }: { urls: string[] }) {
  return (
    <Slider
      className="m-2"
      renderer={(i) => (
        <Image alt={`image-${i}`} src={urls[i]} width={1920} height={800} />
      )}
      length={urls.length}
    />
  )
}
