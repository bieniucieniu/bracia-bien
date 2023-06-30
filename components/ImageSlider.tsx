// "use clinet"
import Image from "next/image"
import * as ScrollArea from "@radix-ui/react-scroll-area"
import { useEffect, useRef } from "react"

const ImgPath = [
  "/images/slider/fotob-33.jpg",
  "/images/slider/fotob-39.jpg",
  "/images/slider/fotob-40.jpg",
]

export default function ImageSlider({ className }: { className?: string }) {
  const img = ImgPath.map((path) => ({
    ref: useRef<HTMLDivElement>(null!),
    path,
  }))
  useEffect(() => {
    let i = 0
    const intervalId = setInterval(() => {
      img[i].ref.current.scrollIntoView({ behavior: "smooth" })
      i++
      if (i > 2) i = 0
    }, 1000 * 5)
    return () => clearInterval(intervalId)
  })

  return (
    <div className={className}>
      <ScrollArea.Root className="w-full h-full overflow-hidden">
        <ScrollArea.Viewport className="w-full h-full">
          <div className="flex flex-row">
            {img.map((e) => (
              <div
                key={e.path}
                ref={e.ref}
                className="h-screen w-[240vh] relative"
              >
                <Image
                  className="object-cover"
                  src={e.path}
                  alt={e.path}
                  fill
                />
              </div>
            ))}
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="horizontal">
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  )
}
