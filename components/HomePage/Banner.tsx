"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import Slider from "../Slider"

const panels: React.ReactNode[] = [
  <div key="panel-lama" className="h-full grid items-center">
    <Image
      alt={`panel-lama`}
      src="/lama.webp"
      width={1920}
      height={953}
      className="object-contain rounded-lg"
    />
  </div>,
  <div key="panel-moraj" className="h-full grid items-center">
    <Image
      alt={`panel-moraj`}
      src="/moraj.webp"
      width={1500}
      height={1080}
      className="object-contain rounded-lg"
    />
  </div>,
  <div key="panel-gabriella" className="h-full grid items-center">
    <Image
      alt={`panel-gabriella`}
      src="/gabriella.webp"
      width={1062}
      height={765}
      className="object-contain rounded-lg"
    />
  </div>,
  <div key="panel-else" className="h-full flex items-center justify-center">
    <ul className="grid grid-cols-4 gap-2">
      {Array.from({ length: 10 }).map((_, i) => (
        <li key={i}>
          <Image
            src="https://placehold.co/150x100/png"
            alt="placehold"
            width={150}
            height={100}
            className="object-contain rounded-lg"
          />
        </li>
      ))}
    </ul>
  </div>,
]

export default function Banner({ swapAfter }: { swapAfter: number }) {
  const [swap, setSwap] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => setSwap(true), swapAfter)
  }, [swapAfter])

  return swap ? (
    <Slider renderer={(i) => panels[i]} length={panels.length} />
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
