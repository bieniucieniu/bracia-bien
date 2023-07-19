"use client"
import { playfair } from "@/app/fonts"
import { motion } from "framer-motion"
import React, { ReactNode, useMemo, useState } from "react"
import { twMerge } from "tailwind-merge"
import { v4 as uuidv4 } from "uuid"

export default function Contacts({
  title,
  children,
  className,
  classNameMotion,
}: {
  title?: ReactNode
  children?: ReactNode[]
  className?: string
  classNameMotion?: string
}) {
  const [active, setActive] = useState<number>(0)

  const layoutId = useMemo(() => uuidv4(), [])

  return (
    <div
      className={twMerge(
        "flex justify-center relative overflow-hidden bg-red-500",
        className
      )}
      onMouseLeave={() => setActive(0)}
    >
      {active === 0 ? (
        <motion.div
          layoutId={layoutId}
          className={twMerge("bg-blue-400 ", classNameMotion)}
          style={{
            position: "absolute",
            inset: 0,
          }}
          transition={{ duration: 0.3 }}
        ></motion.div>
      ) : null}
      <div className="max-w-fit m-auto flex flex-col gap-0">
        {title && (
          <h1
            className={twMerge(
              playfair.className,
              "text-4xl font-bold z-10 mb-8"
            )}
          >
            {title}
          </h1>
        )}
        {children &&
          children.map((e, i) => (
            <div
              key={i + 1}
              className="relative px-4 py-2 rounded-lg z-10 w-fit hover:underline"
              onMouseOver={() => setActive(i + 1)}
            >
              {active === i + 1 ? (
                <motion.div
                  layoutId={layoutId}
                  className={twMerge("bg-blue-400 ", classNameMotion)}
                  style={{
                    position: "absolute",
                    zIndex: -10,
                    inset: 0,
                    borderRadius: "var(--radius)",
                  }}
                  transition={{ duration: 0.2 }}
                ></motion.div>
              ) : null}
              {e}
            </div>
          ))}
      </div>
    </div>
  )
}
