"use client"
import { playfair } from "@/app/fonts"
import { motion } from "framer-motion"
import React, { ReactNode, useMemo, useState } from "react"
import { twMerge } from "tailwind-merge"
import { v4 as uuidv4 } from "uuid"

type ItemBase = {
    active: number
    children: ReactNode
    setActive: (id: number) => void
    className?: string
    classNameMotion?: string
} & (ItemLink | ItemButton)

type ItemLink = {
    newTab?: boolean
    href?: string
    onClick?: never
}
type ItemButton = {
    onClick?: () => void
    newTab?: never
    href?: never
}

function Item({
    id,
    active,
    setActive,
    children,
    className,
    classNameMotion,
    newTab,
    layoutId,
    ...props
}: ItemBase & { id: number; layoutId: string }) {
    const Comp: "a" | "div" = props.href !== undefined ? "a" : "div"
    return (
        <Comp
            target={newTab ? "_blank" : undefined}
            {...props}
            onMouseOver={() => setActive(id)}
            className={twMerge(
                className,
                "relative px-4 py-2 rounded-lg z-10 w-fit hover:underline"
            )}
        >
            {active === id ? (
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
            {children}
        </Comp>
    )
}

export default function Contacts({
    title,
    data,
    children,
    className,
}: {
    title: ReactNode
    children?: ReactNode
    className?: {
        fg?: string
        bg?: string
    }
    data: {
        name: string
        href?: string
        className?: string
        newTab?: boolean
    }[]
}) {
    const [active, setActive] = useState<number>(0)

    const layoutId = useMemo(() => uuidv4(), [])

    return (
        <div
            className={twMerge(
                "flex justify-center relative overflow-hidden bg-red-500",
                className?.bg
            )}
            onMouseLeave={() => setActive(0)}
        >
            {active === 0 ? (
                <motion.div
                    layoutId={layoutId}
                    className={twMerge("bg-blue-400", className?.fg)}
                    style={{
                        position: "absolute",
                        inset: 0,
                    }}
                    transition={{ duration: 0.3 }}
                ></motion.div>
            ) : null}
            <div className="max-w-fit m-auto flex flex-col gap-0">
                <h1
                    className={twMerge(
                        playfair.className,
                        "text-4xl font-bold z-10"
                    )}
                >
                    {title}
                </h1>
                {data.map(({ name: name, ...props }, i) => (
                    <Item
                        layoutId={layoutId}
                        key={name}
                        id={i + 1}
                        {...props}
                        active={active}
                        setActive={setActive}
                        classNameMotion={className?.fg}
                    >
                        {name}
                    </Item>
                ))}
                <Item
                    layoutId={layoutId}
                    id={data.length + 1}
                    active={active}
                    setActive={setActive}
                >
                    {children}
                </Item>
            </div>
        </div>
    )
}
