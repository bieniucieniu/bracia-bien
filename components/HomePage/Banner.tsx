"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import Slider from "../Slider"
const data = [
  { src: "/gabriella.webp", key: "gabriella_baner" },
  { src: "/lama.webp", key: "lama_baner" },
  { src: "/moraj.webp", key: "moraj_baner" },
]

const panels: React.ReactNode[] = [
  <Image
    alt={`panel-gabriella`}
    src="/gabriella.webp"
    width={1500}
    height={1080}
    className="object-contain rounded-lg"
  />,
  <Image
    alt={`panel-gabriella`}
    src="/gabriella.webp"
    width={1500}
    height={1080}
    className="object-contain rounded-lg "
  />,
  <Image
    alt={`panel-gabriella`}
    src="/gabriella.webp"
    width={1500}
    height={1080}
    className="object-contain rounded-lg"
  />,
]

export default function Banner({ swapAfter }: { swapAfter: number }) {
  const [swap, setSwap] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => setSwap(true), swapAfter)
  }, [swapAfter])

  return swap ? (
    <Slider renderer={(i) => panels[i]} length={data.length} />
  ) : (
    <Image
      src="/logo.png"
      priority
      alt="logo"
      width={638}
      height={189}
      className="m-auto px-6 py-4 rounded-2xl bg-white"
    />
  )
}
