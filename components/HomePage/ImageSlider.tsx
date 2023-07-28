"use client"
import Image from "next/image"
import { useMainLayoutContext } from "@/components/MainLayout/MainLayoutContext"
import Slider from "../Slider"

export function ImageSliderMain() {
  const { imgs } = useMainLayoutContext()
  return (
    <Slider
      className="m-2"
      renderer={(i) => (
        <Image
          alt={`image-${i}`}
          src={imgs.main[i]}
          width={1920}
          height={800}
        />
      )}
      length={imgs.main.length}
    />
  )
}
export function ImageSliderCurrent() {
  const { imgs } = useMainLayoutContext()
  return (
    <Slider
      className="m-2"
      renderer={(i) => (
        <Image
          alt={`image-${i}`}
          src={imgs.current[i]}
          width={1920}
          height={800}
        />
      )}
      length={imgs.current.length}
    />
  )
}
