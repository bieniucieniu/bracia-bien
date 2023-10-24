import { MenuItem, MenuRoot } from "@/components/PillMenu"
import { playfair } from "@/lib/fonts"
import { ImageSlider } from "@/components/HomePage/ImageSlider"
import PhotoGalery from "@/components/HomePage/PhotoGallery"
import {
  getAllImagesData,
  populateImagesDataWithLinks,
} from "@/db/imagesData/serverApi"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { twMerge } from "tailwind-merge"
import { Baby, Clock, Medal, Minimize2, Smile } from "lucide-react"

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
  let galleryImgs: typeof imgsData = []

  if (imgsData instanceof Array) {
    mainImgs = imgsData.filter((e) => e.categorie === "main")
    currentImgs = imgsData.filter((e) => e.categorie === "current")
    galleryImgs = imgsData.filter((e) => e.categorie === "gallery")
  }

  return (
    <>
      <div className="min-h-screen pt-4 flex justify-center items-center px-4">
        <Image src="/logo.png" priority alt="logo" width={638} height={189} />
      </div>
      <section
        id="about"
        className="bg-red-400 flex justify-center items-center py-10"
      >
        <div className="max-w-6xl mx-auto px-4 lg:px-20 grid grid-cols-3 gap-x-3 gap-y-4">
          <div className="col-span-1 rougded-xl p-1.5 hidden bg-white rounded-xl lg:block">
            <Image
              src="/blob.svg"
              alt="hurtownia"
              width={900}
              height={600}
              className="w-auto rounded-lg object-contain m-auto"
            />
          </div>
          <Card className="col-span-3 lg:col-span-2 bg-orange-100 grid grid-cols-[1fr_30px] pr-5">
            <div>
              <CardHeader
                className={twMerge(
                  playfair.className,
                  "text-2xl font-bold pb-2",
                )}
              >
                Jestesmy rodzinna firma
              </CardHeader>
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
            </div>
            <div className="flex flex-col justify-around">
              <Image
                src="/boxers-boxer.svg"
                alt="boxers"
                width={30}
                height={30}
              />
              <Image
                src="/boxers-briefs.svg"
                alt="boxers"
                width={30}
                height={30}
              />
              <Image
                src="/socks-solid.svg"
                alt="boxers"
                width={30}
                height={30}
              />
            </div>
          </Card>
          <Card className="bg-white col-span-3 sm:col-span-2">
            <CardHeader
              className={twMerge(playfair.className, "text-2xl font-bold pb-2")}
            >
              Zapraszamy takze do naszych sklepow w Kaliszu
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-4 pl-5">
                <li className="flex justify-start items-center gap-x-2">
                  <Clock />
                  Pod Zegarem. Centrum handlowe
                  <Link
                    href="#"
                    className="text-sm text-stone-500 hover:underline"
                  >
                    ul. Górnośląska 76A{" "}
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-x-2">
                  <Medal />
                  Złote Centrum. Centrum handlowe
                  <Link
                    href="#"
                    className="text-sm text-stone-500 hover:underline"
                  >
                    ul. Polna 14{" "}
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-x-2">
                  <Minimize2 />
                  Mini Park. Centrum handlowe
                  <Link
                    href="#"
                    className="text-sm text-stone-500 hover:underline"
                  >
                    ul. Prymasa Stefana Wyszyńskiego 42a{" "}
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
          <div className="overflow-hidden col-span-1 bg-white rounded-xl py-1.5 hidden sm:block">
            <ImageSlider
              className="flex justify-center items-center h-full"
              data={[
                { src: "/blob.svg", key: "a" },
                { src: "/blob.svg", key: "b" },
                { src: "/blob.svg", key: "c" },
              ]}
            />
          </div>
        </div>
      </section>
      {galleryImgs.length > 0 ? (
        <section className="min-h-screen relative flex justify-stretch items-stretch p-4">
          <PhotoGalery
            data={galleryImgs}
            className="h-[calc(100vh_-_32px)] w-[calc(100vw_-_32px)]"
          />
        </section>
      ) : null}
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
