"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import Slider from "@/components/Slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const panels: React.ReactNode[] = [
  <div key="panel-lama" className="h-full grid items-center relative">
    <Card className="sm:absolute sm:top-3/4 sm:left-3/4 sm:-translate-x-1/2 sm:-translate-y-1/2">
      <CardHeader>
        <CardTitle>
          Oferujemy szeroki wybór bielizny damskiej, jak i meskiej.
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">takich marek jak lama czy moraj</p>
      </CardContent>
    </Card>
    <Image
      alt={`panel-lama`}
      src="/lama.webp"
      width={1920}
      height={953}
      className="object-contain rounded-lg max-w-screen-2xl mx-auto pointer-events-none w-full h-auto sm:w-auto sm:h-full sm:max-h-[calc(100svh_-_60px)]"
    />
  </div>,
  <div key="panel-moraj" className="h-full grid items-center relative">
    <Card className="sm:absolute sm:top-20 sm:left-1/4 sm:-translate-x-1/2 sm:-translate-y-1/2">
      <CardHeader>
        <CardTitle>U nas znajdzesz piżamę dla siebie</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          Szeroka oferta piżam od Moraj, Lama, Martel, Szata, M-max i Kuba w
          wielu rozmiarch (xs-6xl)
        </p>
      </CardContent>
    </Card>
    <Image
      alt={`panel-moraj`}
      src="/moraj.webp"
      width={1500}
      height={1080}
      className="objeerr := c.BodyParser(body);ct-contain rounded-lg max-w-screen-2xl mx-auto pointer-events-none w-full h-auto  sm:max-w-[90vw]"
    />
  </div>,
  <div key="panel-gabriella" className="h-full grid items-center relative">
    <Card className="sm:absolute sm:top-3/4 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2">
      <CardHeader>
        <CardTitle>Posiadamy w ofercie szeroki wybór rajstop</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          Wiele wzorow, kolorow jak i matowe czy zpolyskiem
        </p>
      </CardContent>
    </Card>
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
        Bielizne i pizamy tych marek znajdziesz u nas
      </h1>
      <sup className="text-sm text-muted-foreground">
        Moraj, Gabriella, Lama, Noviti, Szata, Wik, Martel, M-max, Hodberg,
        Kunitex, Tejrax
      </sup>
    </article>
    <ul className="grid grid-cols-4 justify-center items-center gap-2">
      <li>
        <Image
          src="/logos/moraj.png"
          alt="moraj_logo"
          priority
          width={150}
          height={100}
          className="object-contain rounded-lg pointer-events-none h-[100px] w-auto max-w-[150px] bg-white mx-auto"
        />
      </li>
      <li>
        <Image
          src="/logos/gabriella.png"
          alt="gabriella_logo"
          priority
          width={150}
          height={100}
          className="object-contain rounded-lg pointer-events-none h-[100px] w-auto max-w-[150px] bg-white mx-auto"
        />
      </li>
      <li>
        <Image
          src="/logos/lama.png"
          alt="lama_logo"
          priority
          width={150}
          height={100}
          className="object-contain rounded-lg pointer-events-none h-[100px] w-auto max-w-[150px] bg-white mx-auto"
        />
      </li>
      <li>
        <Image
          src="/logos/szata.png"
          alt="szata_logo"
          priority
          width={150}
          height={100}
          className="object-contain rounded-lg pointer-events-none h-[100px] w-auto max-w-[150px] bg-white mx-auto"
        />
      </li>
      <li>
        <Image
          src="/logos/noviti.jpg"
          alt="noviti_logo"
          priority
          width={150}
          height={100}
          className="object-contain rounded-lg pointer-events-none h-[100px] w-auto max-w-[150px] bg-white mx-auto"
        />
      </li>
      <li>
        <Image
          src="/logos/wik.png"
          alt="wik_logo"
          priority
          width={150}
          height={100}
          className="object-contain rounded-lg pointer-events-none h-[100px] w-auto max-w-[150px] bg-white mx-auto"
        />
      </li>
      <li>
        <Image
          src="/logos/mmax.png"
          alt="m-max_logo"
          priority
          width={150}
          height={100}
          className="object-contain rounded-lg pointer-events-none h-[100px] w-auto max-w-[150px] bg-white mx-auto"
        />
      </li>
      <li>
        <Image
          src="/logos/martel.png"
          alt="martel_logo"
          priority
          width={150}
          height={100}
          className="object-contain rounded-lg pointer-events-none h-[100px] w-auto max-w-[150px] bg-white mx-auto"
        />
      </li>
      <li>
        <Image
          src="/logos/hodberg.jpeg"
          alt="hodberg_logo"
          priority
          width={150}
          height={100}
          className="object-contain rounded-lg pointer-events-none h-[100px] w-auto max-w-[150px] bg-white mx-auto"
        />
      </li>
      <li>
        <Image
          src="/logos/kunitex.webp"
          alt="kunitex_logo"
          priority
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
