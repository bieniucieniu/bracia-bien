"use client"
import Link from "next/link"
import Image from "next/image"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { FacebookIcon, InstagramIcon } from "lucide-react"

export function Topbar() {
  return (
    <nav className="bg-white fixed top-0 left-0 right-0 z-40 drop-shadow-sm p-1 flex flex-wrap-reverse md:grid md:grid-cols-3">
      <NavigationMenu className="m-auto p-1 md:col-start-2">
        <NavigationMenuList>
          <NavigationMenuItem className="hidden md:block">
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/">home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/#about">on nas</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/#info">informacje</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/#gallery">galleria produktów</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
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
