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
import Image from "next/image"
export default function NavigationMenuDemo() {
    return (
        <NavigationMenu className="flex-none p-1">
            <NavigationMenuList className="grid grid-cols-4 sm:grid-cols-5">
                <NavigationMenuItem className="col-span-4 sm:col-span-1">
                    <NavigationMenuLink
                        href="/"
                        className={"relative w-60 h-6 "}
                    >
                        <Image
                            src="/logo.svg"
                            alt="logo"
                            height={30}
                            width={40}
                        />
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>item 1</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className=" grid gap-3 p-4 w-[300px] md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <a
                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                        href="/"
                                    >
                                        <div className="mb-2 mt-4 text-lg font-medium">
                                            stuff
                                        </div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                            Beautifully designed components
                                            built with Radix UI and Tailwind
                                            CSS.
                                        </p>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>item 2</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[300px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <li key={i}>
                                    <NavigationMenuLink asChild>
                                        <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                            <div className="text-sm font-medium leading-none">
                                                Lorem ipsum dolor sit amet,
                                                consectetur adipiscing elit.
                                            </div>
                                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                Curabitur ornare justo ex, vel
                                                egestas quam dictum finibus.
                                            </p>
                                        </a>
                                    </NavigationMenuLink>
                                </li>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>item 3</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[300px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <li key={i}>
                                    <NavigationMenuLink asChild>
                                        <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                            <div className="text-sm font-medium leading-none">
                                                Lorem ipsum dolor sit amet,
                                                consectetur adipiscing elit.
                                            </div>
                                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                Curabitur ornare justo ex, vel
                                                egestas quam dictum finibus.
                                            </p>
                                        </a>
                                    </NavigationMenuLink>
                                </li>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                        >
                            Link
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
