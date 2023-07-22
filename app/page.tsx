import ImageSlider from "@/components/ImageSlider"
import Navbar from "@/components/MainNavbar"
import Link from "next/link"
import Image from "next/image"
import { MenuItem, MenuRoot } from "@/components/PillMenu"
import { playfair } from "./fonts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const imgPaths: string[] = [
  "/images/fotob-33.jpg",
  "/images/fotob-39.jpg",
  "/images/fotob-40.jpg",
]

const cardsData: {
  title?: string
  description?: string
  children?: React.ReactNode
  footer?: React.ReactNode
}[] = [{}]

type LinkData = { name: string; href: string; target?: string; rel?: string }[]

const contactsData: LinkData = [
  { name: "+48 502 896 299", href: "tel:+48502896299" },
  {
    name: "braciabien@gmail.com",
    href: "mailto:braciabien@gmail.com",
  },
  {
    name: "Stawiszyńska 125, 62-800 Kalisz",
    href: "https://goo.gl/maps/BfMbTwFQTeVjVR717",
    target: "_blank",
  },
]

const infoData: LinkData = [
  {
    name: "Polityka prywatnosci",
    href: "/pdf/polityka_prywatnosci.pdf",
    rel: "noopener noreferrer",
  },
  {
    name: "Platnosc",
    href: "/pdf/platnosc.pdf",
    rel: "noopener noreferrer",
  },
  {
    name: "regulamin sklepu",
    href: "/pdf/regulamin_sklepu.pdf",
    rel: "noopener noreferrer",
  },
  {
    name: "wysylka",
    href: "/pdf/wysylka.pdf",
    rel: "noopener noreferrer",
  },
]

export default function Home() {
  return (
    <main
      style={{ scrollbarGutter: "stable" }}
      className="snap-y snap-proximity overflow-auto h-screen"
    >
      <div className="flex flex-col min-h-screen relative bg-yellow-200 snap-center">
        <Link href="/">
          <Image
            src="/logo.png"
            className="m-auto object-contain"
            alt="logo"
            width={638}
            height={189}
          />
        </Link>
      </div>
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 snap-center">
        <ImageSlider className="flex-1 m-2 " imgPaths={imgPaths} />
        <div className="bg-red-600 flex p-10">
          {cardsData.map(({ title, description, children, footer }) => (
            <Card>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent>{children}</CardContent>
              <CardFooter>{footer}</CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <footer className="min-h-screen grid grid-cols-1 xl:grid-cols-3 snap-center">
        <MenuRoot
          className="flex bg-red-500 justify-center relative overflow-hidden col-span-2"
          styleMotion={{ backgroundColor: "lightblue" }}
        >
          <div className="max-w-fit m-auto flex flex-col gap-0">
            <h1
              className={playfair.className + " text-4xl font-bold z-10 mb-8"}
            >
              Skontaktuj się <br /> z nami
            </h1>

            {contactsData.map(({ name, ...props }, i) => (
              <MenuItem
                key={i}
                className="relative px-4 py-2 rounded-lg z-10 w-fit hover:underline"
                styleMotion={{
                  backgroundColor: "lightblue",
                  borderRadius: "10px",
                }}
              >
                <a {...props}>{name}</a>
              </MenuItem>
            ))}
          </div>
        </MenuRoot>
        <MenuRoot
          className="flex bg-sky-100 justify-center relative overflow-hidden"
          styleMotion={{ backgroundColor: "pink" }}
        >
          <div className="max-w-fit m-auto flex flex-col gap-0">
            <h1
              className={playfair.className + " text-4xl font-bold z-10 mb-8"}
            >
              informacje
            </h1>
            {infoData.map(({ name, ...props }, i) => (
              <MenuItem
                key={i}
                className="relative px-4 py-2 rounded-lg z-10 w-fit hover:underline"
                styleMotion={{
                  borderRadius: "10px",
                }}
              >
                <a {...props}>{name}</a>
              </MenuItem>
            ))}
          </div>
        </MenuRoot>
      </footer>
    </main>
  )
}
