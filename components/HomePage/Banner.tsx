"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import Slider from "../Slider"

const panels: React.ReactNode[] = [
  <div key="panel-lama" className="h-full grid items-center relative">
    <article className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-xl backdrop-blur-md py-6 px-8 rounded-xl flex flex-col items-center">
      <h1 className="text-4xl font-bold pb-4">Lorem ipsum dolor sit amet</h1>
      <p>
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </article>
    <Image
      alt={`panel-lama`}
      src="/lama.webp"
      width={1920}
      height={953}
      className="object-contain rounded-lg w-full h-auto max-w-screen-2xl mx-auto pointer-events-none"
    />
  </div>,
  <div key="panel-moraj" className="h-full grid items-center relative">
    <article className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-xl backdrop-blur-md py-6 px-8 rounded-xl flex flex-col items-center">
      <h1 className="text-4xl font-bold pb-4">Lorem ipsum dolor sit amet</h1>
      <p>
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </article>{" "}
    <Image
      alt={`panel-moraj`}
      src="/moraj.webp"
      width={1500}
      height={1080}
      className="object-contain rounded-lg w-full h-auto max-w-screen-2xl mx-auto pointer-events-none"
    />
  </div>,
  <div key="panel-gabriella" className="h-full grid items-center relative">
    <article className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-xl backdrop-blur-md py-6 px-8 rounded-xl flex flex-col items-center">
      <h1 className="text-4xl font-bold pb-4">Lorem ipsum dolor sit amet</h1>
      <p>
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </article>
    <Image
      alt={`panel-gabriella`}
      src="/gabriella.webp"
      width={1062}
      height={765}
      className="object-contain rounded-lg w-full h-auto max-w-screen-2xl mx-auto pointer-events-none"
    />
  </div>,
  <div
    key="panel-else"
    className="h-full flex flex-col gap-y-6 items-center justify-center"
  >
    <article>
      <h1 className="text-4xl font-bold pb-4">Lorem ipsum dolor sit amet</h1>
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
      dolore magna aliqua.
    </article>
    <ul className="grid grid-cols-4 gap-2">
      {Array.from({ length: 10 }).map((_, i) => (
        <li key={i}>
          <Image
            src="https://placehold.co/150x100/png"
            alt="placehold"
            width={150}
            height={100}
            className="object-contain rounded-lg pointer-events-none"
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
