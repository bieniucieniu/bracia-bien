"use client"
import Link from "next/link"
import Image from "next/image"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { FacebookIcon, InstagramIcon } from "lucide-react"

const items: { title: string; href: string }[] = [
  {
    title: "o nas",
    href: "/#about",
  },
  {
    title: "informacje",
    href: "/info",
  },
  {
    title: "galleria produktów",
    href: "/#gallery",
  },
]

export function Topbar() {
  return (
    <nav className="bg-white fixed top-0 left-0 right-0 z-40 drop-shadow-sm p-1 flex flex-wrap-reverse md:grid md:grid-cols-3">
      <NavigationMenu className="m-auto p-1 md:col-start-2">
        <NavigationMenuList className="flex flex-wrap justify-around sm:justify-normal sm:flex-nowrap">
          {items.map(({ title, href }, i) => (
            <NavigationMenuItem key={title + i}>
              <NavigationMenuLink
                asChild
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
              >
                <Link href={href}>{title}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex flex-row justify-between w-full md:w-auto md:justify-end">
        <Link href="/" rel="noopener noreferrer" className="md:hidden">
          <Image
            src="/logo.png"
            priority
            className="m-auto object-contain select-none transition-opacity opacity-60 hover:opacity-100 justify-self-start h-8 w-28"
            alt="logo"
            width={638}
            height={189}
          ></Image>
        </Link>
        <div className="flex my-auto flex-row gap-4 md:gap-8 md:mr-8 justify-end">
          <Link
            href="https://www.instagram.com/braciabien/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon
              width={30}
              height={30}
              className="opacity-50 hover:opacity-80 transition-opacity"
            />
          </Link>
          <Link
            href="https://www.facebook.com/BraciaBien/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon
              height={30}
              width={30}
              className="opacity-50 hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>
      </div>
    </nav>
  )
}
