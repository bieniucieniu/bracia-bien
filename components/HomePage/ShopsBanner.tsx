"use client"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Slider from "../Slider"
import { twMerge } from "tailwind-merge"

const panels: React.ReactNode[] = [
  <Card key="panel-zlote-centrum" className="h-full overflow-hidden">
    <Image
      src="/zlote_centrum.jpg"
      width={900}
      height={600}
      alt="zlote_centrum"
      className="pointer-events-none"
    />
    <CardHeader>
      <CardTitle>Zlote Centrum</CardTitle>
      <CardDescription>
        <a
          href="https://maps.app.goo.gl/tJY4N583AFMifp6d8"
          target="_blank"
          className="hover:underline text-sm"
        >
          Polna 14, 62-800 Kalisz,
        </a>
        <br />
        na przeciwko społem
      </CardDescription>
    </CardHeader>
    <CardContent></CardContent>
  </Card>,
  <Card key="panel-pod-zegarem" className="h-full overflow-hidden">
    <Image
      src="/pod_zegarem.jpg"
      width={900}
      height={600}
      alt="pod_zegarem"
      className="pointer-events-none"
    />
    <CardHeader>
      <CardTitle>Pod Zegarem</CardTitle>
      <CardDescription>
        <a
          href="https://maps.app.goo.gl/K3Uq9qp7jxPyci946"
          target="_blank"
          className="hover:underline text-md"
        >
          Górnośląska 76A, 62-800 Kalisz,
        </a>
        <br />
        na parterze
      </CardDescription>
    </CardHeader>
    <CardContent></CardContent>
  </Card>,
  <Card key="panel-mini-park" className="h-full overflow-hidden">
    <Image
      src="/mini_park.jpg"
      width={900}
      height={600}
      alt="mini_park"
      className="pointer-events-none"
    />
    <CardHeader>
      <CardTitle>Mini Park</CardTitle>
      <CardDescription>
        <a
          href="https://maps.app.goo.gl/Yb8K3F7PQCyH3ivB9"
          target="_blank"
          className="hover:underline text-md"
        >
          Prymasa Stefana Wyszyńskiego 42a, 62-800 Kalisz
        </a>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <br />
    </CardContent>
  </Card>,
]

export default function ShopesBanner({ className }: { className?: string }) {
  return (
    <Slider
      className={twMerge("h-full", className)}
      renderer={(i) => panels[i]}
      length={panels.length}
    />
  )
}
