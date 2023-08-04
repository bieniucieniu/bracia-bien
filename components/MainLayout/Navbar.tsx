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

export function Topbar() {
  return (
    <nav
      style={{ scrollbarGutter: "stable" }}
      className="bg-white fixed top-0 left-0 right-0 z-40 drop-shadow-sm p-1 flex flex-wrap-reverse md:grid md:grid-cols-3"
    >
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
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex flex-row justify-between w-full md:w-auto md:justify-end">
        <Link href="/" rel="noopener noreferrer" className="md:hidden">
          <Image
            src="/logo.png"
            className="m-auto object-contain select-none transition-opacity opacity-60 hover:opacity-100 justify-self-start h-8 w-28"
            alt="logo"
            width={638}
            height={189}
          ></Image>
        </Link>
        <div className="flex my-auto flex-row gap-8 mr-8 justify-end">
          <Link
            href="https://www.instagram.com/braciabien/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/instagram.svg"
              className="m-auto object-contain select-none transition-opacity opacity-60 hover:opacity-100 h-6 md:h-8"
              alt="instagram"
              width={50}
              height={50}
            ></Image>
          </Link>
          <Link
            href="https://www.facebook.com/BraciaBien/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/facebook.svg"
              className="m-auto object-contain select-none transition-opacity opacity-60 hover:opacity-100 h-6 md:h-8"
              alt="facebook"
              width={50}
              height={50}
            ></Image>
          </Link>
        </div>
      </div>
    </nav>
  )
}
