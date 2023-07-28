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
export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Topbar />
      {children}
    </>
  )
}

function Topbar() {
  return (
    <nav
      style={{ scrollbarGutter: "stable" }}
      className="bg-white fixed top-0 left-0 right-0 z-40 grid grid-cols-3 drop-shadow-sm"
    >
      <NavigationMenu className="m-auto p-1 col-start-2">
        <NavigationMenuList>
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
              <Link href="/#about">on nas</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex mr-8 my-auto flex-row gap-8 justify-end">
        <Link
          href="https://www.instagram.com/braciabien/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/instagram.svg"
            className="m-auto object-contain select-none transition-opacity opacity-60 hover:opacity-100 h-8"
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
            className="m-auto object-contain select-none transition-opacity opacity-60 hover:opacity-100 h-8"
            alt="facebook"
            width={50}
            height={50}
          ></Image>
        </Link>
      </div>
    </nav>
  )
}
