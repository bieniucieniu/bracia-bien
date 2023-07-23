"use client"
import { useEffect, useMemo, useReducer, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { twMerge } from "tailwind-merge"
import { v4 as uuidv4 } from "uuid"
const variants = {
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
  }),
}

export default function ImageSlider({
  className,
  imgPaths,
  full,
}: {
  className?: string
  children?: React.ReactNode[]
  imgPaths: string[]
  full?: boolean
}) {
  type Slide = { idx: number; direction: "left" | "right" }

  function reducer(state: Slide, action: "next" | "previous"): Slide {
    switch (action) {
      case "next":
        return {
          idx: (state.idx + 1) % imgPaths.length,
          direction: "right",
        }
      case "previous":
        return {
          idx: state.idx === 0 ? imgPaths.length - 1 : state.idx - 1,
          direction: "left",
        }
    }
  }

  const [state, dispach] = useReducer(reducer, {
    idx: 0,
    direction: "right",
  })

  useEffect(() => {
    const interval = setInterval(() => dispach("next"), 1000 * 6)
    return () => clearInterval(interval)
  }, [state])

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
  }, [state.idx, state.direction])

  return (
    <div className={twMerge("overflow-hidden relative", className)}>
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
          className={`absolute inset-0 flex  items-center ${
            full ? "" : "p-2"
          } `}
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
            src={imgPaths[state.idx]}
            className={`object-contain transition-all h-fit w-fit flex-1 ${
              full ? "" : "rounded-xl"
            }`}
            alt={`imgs-slid-${state.idx}`}
            width={1920}
            height={800}
            priority
          />
        </motion.div>
      </AnimatePresence>
      <button
        className="absolute z-10 top-[calc(50%_-_20px)] left-[15px] w-[40px] h-[40px] rounded-full bg-white opacity-50 hover:opacity-100 transition-all"
        onClick={() => dispach("previous")}
      >
        <Image
          src="/angle-left.svg"
          alt="left arrow"
          className="object-contain absolute top-[calc(50%_-_15px)] left-[3px]"
          width={30}
          height={30}
        ></Image>
      </button>
      <button
        className="absolute z-10 top-[calc(50%_-_20px)] right-[15px] w-[40px] h-[40px] rounded-full bg-white opacity-50 hover:opacity-100 transition-all"
        onClick={() => dispach("next")}
      >
        <Image
          src="/angle-right.svg"
          alt="left right"
          className="object-contain absolute top-[calc(50%_-_15px)] right-[3px]"
          width={30}
          height={30}
        ></Image>
      </button>
    </div>
  )
}
