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
import { twMerge } from "tailwind-merge"
import { ScrollArea } from "../ui/scroll-area"

export function InfoCards({
  cards,
  className,
}: {
  cards: (z.infer<typeof insertCardSchema> & { imageUrl?: string })[]
  className?: string
}) {
  if (!cards.length) return null
  return (
    <Slider
      className={twMerge("m-2", className)}
      autoSlide={false}
      length={cards.length}
      renderer={(i) => {
        const d = cards[i]
        return (
          <Card className="md:mx-16 max-h-[calc(100svh_-_300px)]">
            <ScrollArea className="m-1 h-[calc(100svh_-_308px)]">
              <CardHeader>
                <CardTitle>{d.title}</CardTitle>
                {d.description ? (
                  <CardDescription>{d.description}</CardDescription>
                ) : null}
              </CardHeader>
              <CardContent className="flex flex-col gap-y-3 h-full ">
                <p>{d.content}</p>
                {d.imageUrl ? (
                  <Image
                    className="object-top rounded-xl bg-black w-full h-full"
                    src={d.imageUrl}
                    alt={d.imageKey ?? ""}
                    width={400}
                    height={400}
                  />
                ) : null}
              </CardContent>
              <CardFooter>
                {d.link ? (
                  <Link
                    target="_blank"
                    className="hover:underline text-blue-400"
                    href={d.link}
                  >
                    Link &gt;
                  </Link>
                ) : null}
              </CardFooter>
            </ScrollArea>
          </Card>
        )
      }}
    />
  )
}
