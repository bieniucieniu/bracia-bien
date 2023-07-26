"use client"
import Image from "next/image"
import { useMainLayoutContext } from "./MainLayoutContext"
import Slider from "../Slider"

export default function ImageSlider() {
  const { imgPaths } = useMainLayoutContext()
  return (
    <Slider
      className="m-2"
      renderer={(i) => (
        <Image alt={`image-${i}`} src={imgPaths[i]} width={1920} height={800} />
      )}
      length={imgPaths.length}
    />
  )
}
