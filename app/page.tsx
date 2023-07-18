import InfoTile from "@/components/InfoTile"
import ImageSlider from "@/components/ImageSlider"
import InfoCards from "@/components/InfoCards"
import Navbar from "@/components/MainNavbar"
import Image from "next/image"
import Link from "next/link"
import SocialLinks from "@/components/SocialLinks"

const imgPaths: string[] = [
  "/images/fotob-33.jpg",
  "/images/fotob-39.jpg",
  "/images/fotob-40.jpg",
]

const navData: Parameters<typeof Navbar>[0] = {
  items: [
    {
      trigger: "Ona",
      content: [
        { href: "", children: "bielzna " },
        { href: "", children: "rajstopy" },
        { href: "", children: "skarpetki" },
        { href: "", children: "pizamy" },
      ],
    },
    {
      trigger: "On",
      content: [
        { href: "", children: "bielzna " },
        { href: "", children: "skarpetki" },
        { href: "", children: "pizamy" },
      ],
    },
    {
      trigger: "dzieci",
      content: [
        { href: "", children: "bielzna " },
        { href: "", children: "skarpetki" },
        { href: "", children: "pizamy" },
      ],
    },
    { trigger: "inne", href: "" },
  ],
}

const cardsData: Parameters<typeof InfoCards>[0] = {
  cards: [{ className: "w-full" }],
}

const contactsData: Parameters<typeof InfoTile>[0] = {
  title: (
    <>
      Skontaktuj się
      <br /> z nami
    </>
  ),
  data: [
    { name: "+48 502 896 299", href: "tel:+48502896299" },
    {
      name: "braciabien@gmail.com",
      href: "mailto:braciabien@gmail.com",
    },
    {
      name: "Stawiszyńska 125, 62-800 Kalisz",
      href: "https://goo.gl/maps/BfMbTwFQTeVjVR717",
      newTab: true,
    },
  ],
}
const infoData: Parameters<typeof InfoTile>[0] = {
  title: "informacje",
  className: "bg-blue-400",
  classNameMotion: "bg-red-500",
  data: [
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
  ],
}

export default function Home() {
  return (
    <main
      style={{ scrollbarGutter: "stable" }}
      className="snap-y snap-proximity overflow-auto h-screen"
    >
      <div className="flex flex-col min-h-screen relative bg-yellow-200 snap-center">
        <nav className="bg-white grid grid-cols-3 grid-rows-[100px_1fr]">
          <SocialLinks />
          <Link href="/">
            <Image
              src="/logo.png"
              className="m-auto object-contain h-[100px]"
              alt="logo"
              width={638}
              height={189}
            ></Image>
          </Link>
          <Navbar {...navData} className="row-start-2 row-end-2 col-span-3" />
        </nav>
      </div>
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 snap-center">
        <ImageSlider className="flex-1" imgPaths={imgPaths} />
        <div className="bg-red-600 flex p-10">
          <InfoCards {...cardsData} />
        </div>
      </div>
      <footer className="min-h-screen grid grid-cols-1 xl:grid-cols-3 snap-center">
        <InfoTile className={"col-span-2"} {...contactsData} />
        <InfoTile {...infoData} />
      </footer>
    </main>
  )
}
