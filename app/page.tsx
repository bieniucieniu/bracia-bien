import { MenuItem, MenuRoot } from "@/components/PillMenu"
import { playfair } from "@/lib/fonts"

import { ImageSlider } from "@/components/HomePage/ImageSlider"
import { InfoCards } from "@/components/HomePage/InfoCard"
import PhotoGalery from "@/components/HomePage/PhotoGallery"
import Banner from "@/components/HomePage/Banner"
import {
  getAllImagesData,
  populateImagesDataWithLinks,
} from "@/db/imagesData/serverApi"
import { getAllInfoCards } from "@/db/infoCard/serverApi"

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
  const infoCards = await getAllInfoCards()

  let mainImgs: typeof imgsData = []
  let currentImgs: typeof imgsData = []
  let galleryImgs: typeof imgsData = []

  if (imgsData instanceof Array) {
    mainImgs = imgsData.filter((e) => e.categorie === "main")
    currentImgs = imgsData.filter((e) => e.categorie === "current")
    galleryImgs = imgsData.filter((e) => e.categorie === "gallery")
  }

  let mainCards: typeof infoCards = []
  let currentCards: typeof infoCards = []

  if (infoCards instanceof Array) {
    const arr = infoCards.map((e) => {
      if (e.imageKey) {
        return {
          ...e,
          imageUrl: imgsData.find((img) => img.key == e.imageKey)?.url,
        }
      }
      return e
    })

    mainCards = arr.filter((e) => e.categorie === "main")
    currentCards = arr.filter((e) => e.categorie === "current")
  }

  return (
    <>
      <div className="min-h-screen relative grid overflow-x-hidden pt-4">
        <Banner data={mainImgs} />
      </div>
      <div
        id="about"
        className="min-h-screen grid grid-cols-1 lg:grid-cols-2 snap-center"
      >
        <ImageSlider
          data={currentImgs}
          className="m-2 overflow-x-hidden min-h-screen lg:h-auto"
        />
        <div className="bg-red-500 overflow-hidden min-h-screen lg:h-auto">
          <InfoCards cards={currentCards} />
        </div>
      </div>
      {galleryImgs.length > 0 ? (
        <div className="min-h-screen relative flex justify-stretch items-stretch">
          <PhotoGalery data={galleryImgs} className="m-4 w-full" />
        </div>
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
