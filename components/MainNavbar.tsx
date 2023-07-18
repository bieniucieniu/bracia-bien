"use client"

import Link from "next/link"

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { twMerge } from "tailwind-merge"
import { type ReactNode } from "react"

type Item = {
	trigger: ReactNode
} & (ItemLink | ItemDrop)

type ItemDrop = {
	content: { href: string; children: ReactNode }[]

	href?: never
}

type ItemLink = {
	href: string

	content?: never
}
export default function NavigationMenuDemo({
	className,
	items,
}: {
	className?: string
	items: Item[]
}) {
	return (
		<NavigationMenu className={twMerge("m-auto p-1", className)}>
			<NavigationMenuList className="flex flex-row flex-nowrap justify-around w-full text-4xl">
				{items.map((item, i) => {
					return (
						<NavigationMenuItem key={i}>
							{item.content ? (
								<>
									<NavigationMenuTrigger>
										{item.trigger}
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className=" grid gap-3 p-4 w-[300px] md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
											{item.content.map((e, i) => (
												<li
													className="row-span-3"
													key={i}
												>
													<Link
														href={e.href}
														passHref
														legacyBehavior
													>
														<NavigationMenuLink className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
															{e.children}
														</NavigationMenuLink>
													</Link>
												</li>
											))}
										</ul>
									</NavigationMenuContent>
								</>
							) : (
								<Link
									href={item?.href || "/"}
									legacyBehavior
									passHref
								>
									<NavigationMenuLink
										className={navigationMenuTriggerStyle()}
									>
										{item.trigger}
									</NavigationMenuLink>
								</Link>
							)}
						</NavigationMenuItem>
					)
				})}
				<NavigationMenuItem></NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	)
}
