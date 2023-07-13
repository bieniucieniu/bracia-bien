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
import Image from "next/image"
import { type ReactNode } from "react"

type Item = ItemLink | ItemDrop

type ItemDrop = {
    trigger: ReactNode
    content: { href: string; children: ReactNode }[]

    children?: never
    href?: never
}

type ItemLink = {
    children: ReactNode
    href: string

    trigger?: never
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
        <nav className={twMerge("bg-white", className)}>
            <Link href="/" className="">
                <Image
                    src="/logo.png"
                    className="m-auto object-contain h-[50px]"
                    alt="logo"
                    width={638}
                    height={189}
                ></Image>
            </Link>
            <NavigationMenu className="m-auto p-1">
                <NavigationMenuList className="flex flex-row flex-nowrap justify-around w-full text-4xl">
                    {items.map((item, i) => {
                        return (
                            <NavigationMenuItem key={i}>
                                {item.trigger ? (
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
                                            {item.children}
                                        </NavigationMenuLink>
                                    </Link>
                                )}
                            </NavigationMenuItem>
                        )
                    })}
                    <NavigationMenuItem></NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </nav>
    )
}
