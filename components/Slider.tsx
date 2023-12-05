import { useCallback, useEffect, useReducer, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { twMerge } from "tailwind-merge"
import { v4 as uuidv4 } from "uuid"
import { ArrowLeft, ArrowRight } from "lucide-react"
const variants: Parameters<typeof motion.div>[0]["variants"] = {
  enter: ({
    direction,
    dim,
  }: {
    direction: "left" | "right"
    dim: { x: number; y: number }
  }) => ({
    zIndex: 0,
    x: { left: -dim.x, right: dim.x }[direction],
    opacity: 0,
    position: "absolute",
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: ({
    direction,
    dim,
  }: {
    direction: "left" | "right"
    dim: { x: number; y: number }
  }) => ({
    zindex: 0,
    x: { left: dim.x, right: -dim.x }[direction],
    opacity: 0,
    position: "absolute",
  }),
}

const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

export default function Slider({
  className,
  length,
  renderer,
  autoSlide = 6000,
}: {
  className?: string
  renderer: (idx: number) => React.ReactNode
  length: number
  autoSlide?: number | false
}) {
  type Slide = { idx: number; direction: "left" | "right" }

  const reducer = useCallback(
    (state: Slide, action: "next" | "previous"): Slide => {
      switch (action) {
        case "next":
          return {
            idx: (state.idx + 1) % length,
            direction: "right",
          }
        case "previous":
          return {
            idx: state.idx === 0 ? length - 1 : state.idx - 1,
            direction: "left",
          }
      }
    },
    [length],
  )

  const [state, dispach] = useReducer(reducer, {
    idx: 0,
    direction: "right",
  })

  const ref = useRef<HTMLDivElement>(null!)
  const [dim, setDim] = useState({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    setDim({
      x: ref.current.clientWidth,
      y: ref.current.clientHeight,
    })
  }, [state])

  useEffect(() => {
    if (!autoSlide) return
    const interval = setInterval(() => dispach("next"), 1000 * 6)
    return () => clearInterval(interval)
  }, [state, autoSlide])

  return (
    <div className={twMerge("relative", className)}>
      <AnimatePresence
        custom={{
          direction: state.direction,
          dim,
        }}
      >
        <motion.div
          ref={ref}
          custom={{
            direction: state.direction,
            dim,
          }}
          key={uuidv4()}
          variants={variants}
          className="h-full w-full grid items-center"
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(_, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x)

            if (swipe < -swipeConfidenceThreshold) {
              dispach("next")
            } else if (swipe > swipeConfidenceThreshold) {
              dispach("previous")
            }
          }}
        >
          {renderer(state.idx)}
        </motion.div>
      </AnimatePresence>
      <button
        className="absolute z-10 top-[calc(50%_-_20px)] left-[15px] w-[40px] h-[40px] rounded-full bg-accent opacity-0 md:opacity-50 hover:opacity-70 transition-all select-none"
        onClick={() => dispach("previous")}
      >
        <ArrowLeft className="absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2" />
      </button>
      <button
        className="absolute z-10 top-[calc(50%_-_20px)] right-[15px] w-[40px] h-[40px] rounded-full bg-accent opacity-0 md:opacity-50 hover:opacity-70 transition-all select-none"
        onClick={() => dispach("next")}
      >
        <ArrowRight className="absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2" />
      </button>
    </div>
  )
}
