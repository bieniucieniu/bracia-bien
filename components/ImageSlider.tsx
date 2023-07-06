// "use clinet"
import { useEffect, useReducer } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { twMerge } from "tailwind-merge"

const ImgPaths = [
  "/images/fotob-33.jpg",
  "/images/fotob-39.jpg",
  "/images/fotob-40.jpg",
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
  const [idx, setIdx] = useReducer(reducer, 0)

  useEffect(() => {
    const interval = setInterval(() => setIdx("next"), 1000 * 6)
    return () => clearInterval(interval)
  }, [idx])

  return (
    <div className={twMerge("overflow-hidden relative", className)}>
      <AnimatePresence>
        <motion.div
          key={`imgs-slid-${idx}`}
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
            src={ImgPaths[idx]}
            alt={`imgs-slid-${idx}`}
            width={1920}
            height={800}
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
