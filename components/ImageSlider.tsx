// "use clinet"
import { useEffect, useReducer } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { twMerge } from "tailwind-merge"
import Image from "next/image"
const ImgPaths = [
  "/images/slider/fotob-33.jpg",
  "/images/slider/fotob-39.jpg",
  "/images/slider/fotob-40.jpg",
]

const variants = {
  enter: {
    zindex: 0,
    x: 1920,
    opacity: 0,
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: {
    zIndex: 0,
    x: -1920,
    opacity: 0,
  },
}

function reducer(idx: number, action: "next" | "previous"): number {
  switch (action) {
    case "next":
      return (idx + 1) % ImgPaths.length
    case "previous": {
      return idx ? ImgPaths.length - 1 : idx - 1
    }
  }
}
export default function ImageSlider({ className }: { className?: string }) {
  const ImgPaths = [
    "/images/fotob-33.jpg",
    "/images/fotob-39.jpg",
    "/images/fotob-40.jpg",
  ]

  const [idx, setIdx] = useReducer(reducer, 0)

  useEffect(() => {
    const interval = setInterval(() => setIdx("next"), 1000 * 6)
    return () => clearInterval(interval)
  }, [idx])

  return (
    <AnimatePresence>
      {
        ImgPaths.map((path, i) => (
          <motion.div
            key={`imgs-slid-${i}`}
            className={twMerge(className, "absolute inset-0")}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            <Image
              src={path}
              alt={`emgs-slid-${i}`}
              width={1920}
              height={800}
              priority
            />
          </motion.div>
        ))[idx]
      }
    </AnimatePresence>
  )
}
