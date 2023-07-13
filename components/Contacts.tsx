"use client"
import { playfair } from "@/app/fonts"
import { motion } from "framer-motion"
import { ReactNode, useState, useRef } from "react"
import { twMerge } from "tailwind-merge"

type Ids = "default" | "tel" | "mail" | "adress"
const items: {
	name: string
	id: Ids
	href?: string
	className?: string
	newTab?: boolean
}[] = [
		{ id: "tel", name: "+48 502 896 299", href: "tel:+48502896299" },
		{
			id: "mail",
			name: "braciabien@gmail.com",
			href: "mailto:braciabien@gmail.com",
		},
		{
			id: "adress",
			name: "Stawiszyńska 125, 62-800 Kalisz",
			href: "https://goo.gl/maps/BfMbTwFQTeVjVR717",
			newTab: true,
		},
	]

type TItem = {
	active: Ids
	children: ReactNode
	setActive: (id: Ids) => void
	id: Ids
	href?: string
	className?: string
	newTab?: boolean
}

function Item({
	id,
	active,
	setActive,
	children,
	className,
	newTab,
	...props
}: TItem) {
	const ref = useRef<HTMLAnchorElement>(null!)

	return (
		<a
			target={newTab ? "_blank" : undefined}
			{...props}
			ref={ref}
			onMouseOver={() => setActive(id)}
			className={twMerge(
				className,
				"relative px-4 py-2 rounded-lg z-10 w-fit hover:underline"
			)}
		>
			{active === id ? (
				<motion.div
					layoutId="contacts-bg"
					className="bg-blue-400 "
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
		</a>
	)
}

export default function Contacts({
	className,
	title,
	contacts,
}: {
	className?: string
	title: ReactNode
	contacts: {
		name: string
		id: Ids
		href?: string
		className?: string
		newTab?: boolean
	}[]
}) {
	const [active, setActive] = useState<Ids>("default")

	return (
		<div
			className={twMerge(
				"flex justify-center relative overflow-hidden bg-red-500",
				className
			)}
			onMouseLeave={() => setActive("default")}
		>
			{active === "default" ? (
				<motion.div
					layoutId="contacts-bg"
					className="bg-blue-400"
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
				{contacts.map(({ name: name, ...i }) => (
					<Item
						key={name}
						{...i}
						active={active}
						setActive={setActive}
					>
						{name}
					</Item>
				))}
			</div>
		</div>
	)
}
