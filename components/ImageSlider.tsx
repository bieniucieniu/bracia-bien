"use client"
import { useEffect, useReducer } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { twMerge } from "tailwind-merge"
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

export default function ImageSlider({
	className,
	imgPaths,
}: {
	className?: string
	imgPaths: string[]
}) {
	function reducer(idx: number, action: "next" | "previous"): number {
		switch (action) {
			case "next":
				return (idx + 1) % imgPaths.length
			case "previous":
				return idx === 0 ? imgPaths.length - 1 : idx - 1
		}
	}
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
						src={imgPaths[idx]}
						className="object-cover h-full w-full"
						alt={`imgs-slid-${idx}`}
						width={1920}
						height={800}
						priority
					/>
				</motion.div>
			</AnimatePresence>
			<button
				className="absolute z-10 top-[calc(50%_-_20px)] left-[10px] w-[48px] h-[48px] rounded-full bg-white opacity-50 hover:opacity-100 transition-all"
				onClick={() => setIdx("previous")}
			></button>
			<button
				className="absolute z-10 top-[calc(50%_-_20px)] right-[10px] w-[48px] h-[48px] rounded-full bg-white opacity-50 hover:opacity-100 transition-all"
				onClick={() => setIdx("next")}
			></button>
		</div>
	)
}
