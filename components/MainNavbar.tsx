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

export type Item = {
  trigger: React.ReactNode
} & (ItemLink | ItemDrop)

type ItemDrop = {
  content?: { href?: string; name?: string }[]

  href?: never
}

type ItemLink = {
  href?: string

  content?: never
}

export default function MainNavbar({
  className,
  items,
  ...props
}: {
  className?: string
  items: Item[]
} & Parameters<typeof NavigationMenu>[0]) {
  return (
    <NavigationMenu className={twMerge("m-auto p-1", className)} {...props}>
      <NavigationMenuList>
        {items.map((item, i) => {
          return (
            <NavigationMenuItem key={i}>
              {item.content ? (
                <>
                  <NavigationMenuTrigger>{item.trigger}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="flex flex-row">
                      <ul className="flex-1 grid gap-3 p-4 max-w-fit">
                        {item.content.map((e, i) => (
                          <li className="row-span-3" key={i}>
                            <Link href={e.href || "/"} passHref legacyBehavior>
                              <NavigationMenuLink className="select-none inline-flex min-h-9 w-full items-center justify-start rounded-md px-4 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
                                {e.name}
                              </NavigationMenuLink>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="bg-red-500 flex-1 w-[300px]"></div>
                    </div>
                  </NavigationMenuContent>
                </>
              ) : (
                <Link href={item?.href || "/"} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.trigger}
                  </NavigationMenuLink>
                </Link>
              )}
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
