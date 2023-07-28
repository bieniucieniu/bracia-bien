"use client"
import Link from "next/link"
import { useMainLayoutContext } from "../MainLayout/MainLayoutContext"
import Slider from "../Slider"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function AboutCards() {
  const cards: JSX.Element[] = [
    <>
      <CardHeader>
        <CardTitle>on nas</CardTitle>
      </CardHeader>
      <CardContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
        sodales fermentum consectetur. Sed id gravida nibh, vel elementum quam.
        Nulla tristique sapien ac accumsan finibus. Sed nunc ligula, ornare ut
        volutpat sed, fermentum at ipsum. Curabitur imperdiet interdum urna, sed
        venenatis urna lobortis quis.
      </CardContent>
      <CardFooter>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
        sodales fermentum consectetur.
      </CardFooter>
    </>,
    <>
      <CardHeader>
        <CardTitle>sklep 1</CardTitle>
        <CardDescription>
          <Link href="https://goo.gl/maps/BfMbTwFQTeVjVR717" target="_blank">
            Stawiszyńska 125, 62-800 Kalisz
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
        sodales fermentum consectetur. Sed id gravida nibh, vel elementum quam.
        Nulla tristique sapien ac accumsan finibus. Sed nunc ligula, ornare ut
        volutpat sed, fermentum at ipsum. Curabitur imperdiet interdum urna, sed
        venenatis urna lobortis quis.
      </CardContent>
      <CardFooter></CardFooter>
    </>,
  ]
  return (
    <Slider
      className="m-2"
      length={cards.length}
      renderer={(i) => <Card className="mx-16">{cards[i]}</Card>}
    />
  )
}
