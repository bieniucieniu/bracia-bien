"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import Slider from "../Slider"

const panels: React.ReactNode[] = [
  <div key="panel-lama" className="h-full grid items-center relative">
    <article className="sm:text-white sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 drop-shadow-xl backdrop-blur-md sm:py-6 px-8 rounded-xl flex flex-col items-center">
      <h1 className="text-3xl font-bold pb-4">
        Oferujemy szeroki wybór bielizny damskiej, jak i meskiej.
      </h1>
      <p className=" w-full">takich marek jak lama czy moraj</p>
    </article>
    <Image
      alt={`panel-lama`}
      src="/lama.webp"
      width={1920}
      height={953}
      className="object-contain rounded-lg max-w-screen-2xl mx-auto pointer-events-none w-full h-auto sm:w-auto sm:h-full sm:max-h-[calc(100svh_-_60px)]"
    />
  </div>,
  <div key="panel-moraj" className="h-full grid items-center relative">
    <article className="sm:absolute sm:top-1/3 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 drop-shadow-xl backdrop-blur-md sm:py-6 px-8 rounded-xl flex flex-col items-center">
      <h1 className="text-lg sm:text-4xl font-bold pb-4">
        U nas znajdzesz piżamę dla siebie
      </h1>
      <p className="text-sm">
        Szeroka oferta piżam od Moraj, Lama, Martel, Szata, M-max i Kuba w wielu
        rozmiarch (xs-6xl)
      </p>
    </article>{" "}
    <Image
      alt={`panel-moraj`}
      src="/moraj.webp"
      width={1500}
      height={1080}
      className="objeerr := c.BodyParser(body);ct-contain rounded-lg max-w-screen-2xl mx-auto pointer-events-none w-full h-auto  sm:max-w-[90vw]"
    />
  </div>,
  <div key="panel-gabriella" className="h-full grid items-center relative">
    <article className="sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 drop-shadow-xl backdrop-blur-md sm:py-6 px-8 rounded-xl flex flex-col items-center">
      <h1 className="text-4xl font-bold pb-4">
        Posiadamy w ofercie szeroki wybór rajstop
      </h1>
      <p className="w-full">
        Wiele wzorow, kolorow jak i matowe czy zpolyskiem
      </p>
    </article>
    <Image
      alt={`panel-gabriella`}
      src="/gabriella.webp"
      width={1062}
      height={765}
      className="object-contain rounded-lg max-w-screen-2xl mx-auto pointer-events-none w-full h-auto sm:max-w-[90vw]"
    />
  </div>,
  <div
    key="panel-else"
    className="h-full flex flex-col gap-y-6 items-center justify-center"
  >
    <article>
      <h1 className="text-4xl font-bold pb-4">
        Bielizne tych marek znajdziesz u nas
      </h1>
      <sup className="text-sm text-muted-foreground">
        Moraj, Gabriella, Lama, Noviti, Szata, Wik, Martel, M-max, Hodberg,
        Lavaza, Kunitex, Tejrax
      </sup>
    </article>
    <ul className="grid grid-cols-4 justify-center items-center gap-2">
      <li>
        <Image
          src="/logos/moraj.png"
          alt="moraj_logo"
          width={150}
          height={100}
          className="object-contain rounded-lg pointer-events-none h-[100px] w-auto max-w-[150px] bg-white mx-auto"
        />
      </li>
      <li>
        <Image
          src="/logos/gabriella.png"
          alt="gabriella_logo"
          width={150}
          height={100}
          className="object-contain rounded-lg pointer-events-none h-[100px] w-auto max-w-[150px] bg-white mx-auto"
        />
      </li>
      <li>
        <Image
          src="/logos/lama.png"
          alt="lama_logo"
          width={150}
          height={100}
          className="object-contain rounded-lg pointer-events-none h-[100px] w-auto max-w-[150px] bg-white mx-auto"
        />
      </li>
      <li>
        <Image
          src="/logos/szata.png"
          alt="szata_logo"
          width={150}
          height={100}
          className="object-contain rounded-lg pointer-events-none h-[100px] w-auto max-w-[150px] bg-white mx-auto"
        />
      </li>
      <li>
        <Image
          src="/logos/noviti.jpg"
          alt="noviti_logo"
          width={150}
          height={100}
          className="object-contain rounded-lg pointer-events-none h-[100px] w-auto max-w-[150px] bg-white mx-auto"
        />
      </li>
      <li>
        <Image
          src="/logos/wik.png"
          alt="wik_logo"
          width={150}
          height={100}
          className="object-contain rounded-lg pointer-events-none h-[100px] w-auto max-w-[150px] bg-white mx-auto"
        />
      </li>
      <li>
        <Image
          src="/logos/mmax.png"
          alt="m-max_logo"
          width={150}
          height={100}
          className="object-contain rounded-lg pointer-events-none h-[100px] w-auto max-w-[150px] bg-white mx-auto"
        />
      </li>
      <li>
        <Image
          src="/logos/martel.png"
          alt="martel_logo"
          width={150}
          height={100}
          className="object-contain rounded-lg pointer-events-none h-[100px] w-auto max-w-[150px] bg-white mx-auto"
        />
      </li>
      <li>
        <Image
          src="/logos/hodberg.jpeg"
          alt="hodberg_logo"
          width={150}
          height={100}
          className="object-contain rounded-lg pointer-events-none h-[100px] w-auto max-w-[150px] bg-white mx-auto"
        />
      </li>
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
