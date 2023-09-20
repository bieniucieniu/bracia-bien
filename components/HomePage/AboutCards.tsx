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
import type { insertCardSchema } from "@/db/infoCard/serverApi"
import type { z } from "zod"
import Image from "next/image"

export function AboutCards({
  cards,
}: {
  cards: (z.infer<typeof insertCardSchema> & { imageUrl?: string })[]
}) {
  if (!cards.length) return null
  return (
    <Slider
      className="m-2"
      autoSlide={false}
      length={cards.length}
      renderer={(i) => {
        const d = cards[i]
        return (
          <Card className="md:mx-16">
            <CardHeader>
              <CardTitle>{d.title}</CardTitle>
              {d.description ? (
                <CardDescription>{d.description}</CardDescription>
              ) : null}
            </CardHeader>
            <CardContent>
              <p>{d.content}</p>
              {d.imageUrl ? (
                <Image src={d.imageUrl} alt={d.imageKey ?? ""} fill />
              ) : null}
            </CardContent>
            <CardFooter>
              {d.link ? (
                <Link className="hover:underline text-blue-400" href={d.link}>
                  Link &gt;
                </Link>
              ) : null}
            </CardFooter>
          </Card>
        )
      }}
    />
  )
}
