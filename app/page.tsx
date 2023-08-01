import Link from "next/link"
import Image from "next/image"
import { MenuItem, MenuRoot } from "@/components/PillMenu"
import { playfair } from "./fonts"

import { ImageSlider } from "@/components/HomePage/ImageSlider"
import { AboutCards } from "@/components/HomePage/About"
import { edgeConfigType } from "@/lib/edgeconfig"
import { get } from "@vercel/edge-config"
import { utapi } from "uploadthing/server"
import PhotoGalery from "@/components/HomePage/PhotoGallery"
import { listFiles } from "@/utils/uploadthing"

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

export default async function Home() {
  const mainImgKeys = (
    await get("mainImgKeys")
  )?.valueOf() as edgeConfigType["mainImgKeys"]
  const mainImgUrls = mainImgKeys?.length
    ? (await utapi.getFileUrls(mainImgKeys)).map((e) => e.url)
    : []

  const currentImgKeys = (
    await get("currentImgKeys")
  )?.valueOf() as edgeConfigType["currentImgKeys"]
  const currentImgUrls = currentImgKeys?.length
    ? (await utapi.getFileUrls(currentImgKeys)).map((e) => e.url)
    : []

  const allImgKeys = (await listFiles()).map((e) => e.key)
  const elseImgKeys = allImgKeys.filter((e) => {
    if (mainImgKeys?.includes(e)) return false
    if (currentImgKeys?.includes(e)) return false
    return true
  })

  const elseImgUrls = elseImgKeys.length
    ? (await utapi.getFileUrls(elseImgKeys)).map((e) => e.url)
    : []

  return (
    <>
      <div className="flex flex-col min-h-screen snap-center justify-center">
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
      <div
        id="about"
        className="min-h-screen grid grid-cols-1 lg:grid-cols-2 snap-center"
      >
        <ImageSlider urls={currentImgUrls} />
        <div className="bg-red-500">
          <AboutCards />
        </div>
      </div>
      <div className="max-h-screen">
        <PhotoGalery urls={elseImgUrls} />
      </div>
      <footer
        id="info"
        className="min-h-screen grid grid-cols-1 xl:grid-cols-3 snap-center"
      >
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
    </>
  )
}
