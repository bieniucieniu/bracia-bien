'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import Link from "next/link"

function Dropdown({ name, children }: {
  name: string,
  children: React.ReactNode
}) {
  return <DropdownMenu>
    <DropdownMenuTrigger>
      <Button className="select-none">
        {name}
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      {Array.isArray(children) ? children.map((e) =>
        <DropdownMenuItem>{e}</DropdownMenuItem>
      ) : children
      }
    </DropdownMenuContent>
  </DropdownMenu>
}




export default function Navbar() {
  return (
    <nav className="flex justify-around p-2">
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
