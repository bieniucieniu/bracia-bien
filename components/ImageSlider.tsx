// "use clinet"
import { useEffect, useReducer } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { twMerge } from "tailwind-merge"
const ImgPath = [
  "/images/slider/fotob-33.jpg",
  "/images/slider/fotob-39.jpg",
  "/images/slider/fotob-40.jpg",
]

type Action = "next" | "previous"
type State = { idx: number; path: string }
function reducer(state: State, action: Action): State {
  let i = state.idx
  switch (action) {
    case "next":
      i = (i + 1) % ImgPath.length
    case "previous":
      i = state.idx === 0 ? ImgPath.length : i - 1
  }
  return { idx: i, path: ImgPath[i] }
}

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }
  },
}

export default function ImageSlider({ className }: { className?: string }) {
  const [img, dispach] = useReducer(reducer, { idx: 0, path: ImgPath[0] })
  useEffect(() => {
    let i = 0
    const intervalId = setInterval(() => {
      dispach("next")
    }, 1000 * 5)
    return () => clearInterval(intervalId)
  })

  return (
    <div className={twMerge(className, "relative")}>
      <AnimatePresence>
        <motion.img
          key={img.path}
          src={img.path}
          custom={1}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        />
      </AnimatePresence>
    </div>
  )
}
