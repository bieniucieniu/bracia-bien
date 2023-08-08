"use client"
import Link from "next/link"
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
        <CardTitle>Hurtownia na Stawiszynskiej</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <Link
          className="hover:underline"
          href="https://goo.gl/maps/p9mYhSsgZWzVhuLA6"
          target="_blank"
        >
          Stawiszyńska 125, 62-800 Kalisz
        </Link>
      </CardFooter>
    </>,
    <>
      <CardHeader>
        <CardTitle>on nas</CardTitle>
      </CardHeader>
      <CardContent>posiadamy 3 sklepy poza hurtownia</CardContent>
      <CardFooter></CardFooter>
    </>,
    <>
      <CardHeader>
        <CardTitle>
          sklep {'"'}Pod Zegarem{'"'}
        </CardTitle>
        <CardDescription>sklep znajduje sie na parterze hali</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <Link
          className="hover:underline"
          href="https://goo.gl/maps/7PkrZp8oaSH2wEY87"
          target="_blank"
        >
          Górnośląska 76A, 62-800 Kalisz
        </Link>
      </CardFooter>
    </>,
    <>
      <CardHeader>
        <CardTitle>
          sklep w {'"'}Mini Parku{'"'}
        </CardTitle>
        <CardDescription>sklep znajduje sie na parterze hali</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <Link
          className="hover:underline"
          href="https://goo.gl/maps/BfMbTwFQTeVjVR717"
          target="_blank"
        >
          Prymasa Stefana Wyszyńskiego 42a, 62-800 Kalisz
        </Link>
      </CardFooter>
    </>,
    <>
      <CardHeader>
        <CardTitle>
          sklep w {'"'}Zlotym Centrun{'"'}
        </CardTitle>
        <CardDescription>sklep znajduje sie na parterze hali</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <Link
          className="hover:underline"
          href="https://goo.gl/maps/7pUSv7apQgftd7uZ9"
          target="_blank"
        >
          Polna 14, 62-800 Kalisz
        </Link>
      </CardFooter>
    </>,
  ]
  return (
    <Slider
      className="m-2"
      autoSlide={false}
      length={cards.length}
      renderer={(i) => <Card className="md:mx-16">{cards[i]}</Card>}
    />
  )
}
