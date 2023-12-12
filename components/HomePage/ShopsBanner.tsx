"use client"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Slider from "../Slider"
import { twMerge } from "tailwind-merge"

const panels: React.ReactNode[] = [
  <Card key="panel-zlote-centrum" className="h-full overflow-hidden">
    <Image
      src="https://placehold.co/900x600/png"
      width={900}
      height={600}
      alt="placeholder"
    />
    <CardHeader>Zlote Centrum</CardHeader>
    <CardContent></CardContent>
  </Card>,
  <Card key="panel-pod-zegarem" className="h-full overflow-hidden">
    <Image
      src="https://placehold.co/900x600/png"
      width={900}
      height={600}
      alt="placeholder"
    />
    <CardHeader>Pod Zegarem</CardHeader>
    <CardContent></CardContent>
  </Card>,
  <Card key="panel-mini-park" className="h-full overflow-hidden">
    <Image
      src="https://placehold.co/900x600/png"
      width={900}
      height={600}
      alt="placeholder"
    />
    <CardHeader>
      <CardTitle>Mini Park</CardTitle>
    </CardHeader>
    <CardContent></CardContent>
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
