import { MenuItem, MenuRoot } from "@/components/PillMenu"
import { playfair } from "@/lib/fonts"
import { ImageSlider } from "@/components/HomePage/ImageSlider"
import {
  getAllImagesData,
  populateImagesDataWithLinks,
} from "@/db/imagesData/serverApi"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { twMerge } from "tailwind-merge"
import { AnimateContentMain } from "@/components/MainLayout/Animation"
import Banner from "@/components/HomePage/Banner"
import ShopesBanner from "@/components/HomePage/ShopsBanner"

export const revalidate = 3600

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
  const imgsData = await populateImagesDataWithLinks(await getAllImagesData())

  let mainImgs: typeof imgsData = []
  let currentImgs: typeof imgsData = []

  if (imgsData instanceof Array) {
    imgsData.forEach((e) => {
      switch (e.categorie) {
        case "main":
          mainImgs.push(e)
        case "current":
          currentImgs.push(e)
      }
    })
  }

  return (
    <AnimateContentMain>
      <div className="mt-[124px] md:mt-[52px] min-h-[600px] sm:min-h-screen pt-4 grid px-4 overflow-x-hidden">
        <Banner swapAfter={2000} />
      </div>
      <section id="about" className="bg-red-400 dark:bg-red-900 py-10">
        <div className="mx-auto lg:px-20 grid grid-cols-6 gap-x-3 gap-y-4">
          <div className="col-span-2 hidden lg:flex justify-center items-center">
            <Image
              src="https://placehold.co/900x600/png"
              alt="hurtownia"
              width={900}
              height={600}
              className="w-full h-auto rounded-xl object-contain"
            />
          </div>
          <Card className="col-start-2 col-span-3 lg:col-span-2 bg-orange-100 dark:bg-orange-950 pr-5">
            <CardHeader
              className={twMerge(playfair.className, "text-2xl font-bold pb-2")}
            ></CardHeader>
            <CardContent>
              <p>
                Oferujemy bogaty asortyment bielizny, rajstop, skarpet i pizam
                dla kobiet, mezczyzn i dzieci. <br /> Siedziba firmy zanjduje
                sie w Kaliszu przy{" "}
                <Link
                  href="https://goo.gl/maps/BfMbTwFQTeVjVR717"
                  target="_blank"
                  className="hover:underline text-indigo-500"
                >
                  ul. Stawiszyńskiej 125{" "}
                </Link>
                , Prowadzimy zarowno sprzedaz hurtowa jak i detaliczna.
              </p>
            </CardContent>
          </Card>
          <Card className="col-start-2 col-span-3">
            <CardHeader
              className={twMerge(playfair.className, "text-2xl font-bold pb-2")}
            >
              Zapraszamy takze do naszych sklepow w Kaliszu
            </CardHeader>
            <CardContent></CardContent>
          </Card>
          <div className="overflow-hidden w-full col-start-5 col-span-2 row-start-1 row-span-2 hidden sm:block">
            <ShopesBanner />
          </div>
        </div>
      </section>
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
              className={
                playfair.className +
                " text-4xl font-bold z-10 mb-8 text-zinc-800"
              }
            >
              Skontaktuj się <br /> z nami
            </h1>

            {contactsData.map(({ name, ...props }, i) => (
              <MenuItem
                key={i}
                className="text-zinc-900 px-4 py-2 rounded-lg z-10 w-fit hover:underline"
                styleMotion={{
                  backgroundColor: "lightblue",
                  borderRadius: "10px",
                }}
              >
                <a {...props}>{name}</a>
              </MenuItem>
            ))}
            <MenuItem
              className="text-zinc-900 px-4 py-2 rounded-lg z-10 w-fit hover:underline"
              styleMotion={{
                backgroundColor: "lightblue",
                borderRadius: "10px",
              }}
            >
              <a href="/info">wiecej</a>
            </MenuItem>
          </div>
        </MenuRoot>
        <MenuRoot
          className="flex bg-sky-100 justify-center relative overflow-hidden"
          styleMotion={{ backgroundColor: "pink" }}
        >
          <div className="max-w-fit m-auto flex flex-col gap-0">
            <h1
              className={
                playfair.className +
                " text-4xl font-bold z-10 mb-8 text-zinc-800"
              }
            >
              informacje
            </h1>
            {infoData.map(({ name, ...props }, i) => (
              <MenuItem
                key={i}
                className="text-zinc-900 px-4 py-2 rounded-lg z-10 w-fit hover:underline"
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
    </AnimateContentMain>
  )
}
