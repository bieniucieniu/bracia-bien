// "use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import Link from "next/link"
import { twMerge } from "tailwind-merge"

function Dropdown({
  name,
  children,
}: {
  name: string
  children: React.ReactNode
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="select-none">{name}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Array.isArray(children)
          ? children.map((e, i) => (
              <DropdownMenuItem key={i}>{e}</DropdownMenuItem>
            ))
          : children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function Navbar({ className }: { className?: string }) {
  return (
    <nav className={twMerge("flex justify-around p-2 bg-orange-50", className)}>
      <Dropdown name="Bielizna Meska">
        <Link href="/">wszystko</Link>
        <Link href="/">wszystko</Link>
        <Link href="/">wszystko</Link>
        <Link href="/">wszystko</Link>
      </Dropdown>
      <Dropdown name="Bielizna Meska">
        <Link href="/">wszystko</Link>
        <Link href="/">wszystko</Link>
        <Link href="/">wszystko</Link>
        <Link href="/">wszystko</Link>
      </Dropdown>
      <Dropdown name="Bielizna Meska">
        <Link href="/">wszystko</Link>
        <Link href="/">wszystko</Link>
        <Link href="/">wszystko</Link>
        <Link href="/">wszystko</Link>
      </Dropdown>
      <Dropdown name="Bielizna Meska">
        <Link href="/">wszystko</Link>
        <Link href="/">wszystko</Link>
        <Link href="/">wszystko</Link>
        <Link href="/">wszystko</Link>
      </Dropdown>
    </nav>
  )
}
