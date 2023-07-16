"use client"
import { useEffect, useReducer } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { twMerge } from "tailwind-merge"
const variants = {
    right: {
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
    },
    left: {
        enter: {
            zindex: 0,
            x: -1920,
            opacity: 0,
        },
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: {
            zIndex: 0,
            x: 1920,
            opacity: 0,
        },
    },
}

export default function ImageSlider({
    className,
    imgPaths,
}: {
    className?: string
    imgPaths: string[]
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

    return (
        <div className={twMerge("overflow-hidden relative", className)}>
            <AnimatePresence>
                <motion.div
                    key={`imgs-slid-${state.idx}`}
                    variants={variants[state.direction]}
                    className="absolute inset-0"
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
                        className="object-contain h-full w-full"
                        alt={`imgs-slid-${state.idx}`}
                        width={1920}
                        height={800}
                        priority
                    />
                </motion.div>
            </AnimatePresence>
            <button
                className="absolute z-10 top-[calc(50%_-_20px)] left-[10px] w-[48px] h-[48px] rounded-full bg-white opacity-50 hover:opacity-100 transition-all"
                onClick={() => dispach("previous")}
            ></button>
            <button
                className="absolute z-10 top-[calc(50%_-_20px)] right-[10px] w-[48px] h-[48px] rounded-full bg-white opacity-50 hover:opacity-100 transition-all"
                onClick={() => dispach("next")}
            ></button>
        </div>
    )
}
