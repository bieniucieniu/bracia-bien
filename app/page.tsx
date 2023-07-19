import InfoTile from "@/components/InfoTile"
import ImageSlider from "@/components/ImageSlider"
import InfoCards from "@/components/InfoCards"
import Navbar from "@/components/MainNavbar"
import SocialLinks from "@/components/SocialLinks"
import Link from "next/link"
import Image from "next/image"
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
        { href: "", name: "bielzna" },
        { href: "", name: "rajstopy" },
        { href: "", name: "skarpetki" },
        { href: "", name: "pizamy" },
      ],
    },
    {
      trigger: "On",
      content: [
        { href: "", name: "bielzna" },
        { href: "", name: "skarpetki" },
        { href: "", name: "pizamy" },
      ],
    },
    {
      trigger: "dzieci",
      content: [
        { href: "", name: "bielzna" },
        { href: "", name: "skarpetki" },
        { href: "", name: "pizamy" },
      ],
    },
    { trigger: "inne", href: "" },
  ],
}

const cardsData: Parameters<typeof InfoCards>[0] = {
  cards: [{ className: "w-full" }],
}
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
        <nav className="bg-white grid grid-cols-3 grid-rows-[60px_1fr] xl:grid-rows-[100px_1fr]">
          <SocialLinks className=" items-center xl:row-span-2" />
          <Link href="/">
            <Image
              src="/logo.png"
              className="mx-auto object-contain h-[60px] xl:h-[100px]"
              alt="logo"
              width={638}
              height={189}
            />
          </Link>
          <Navbar
            {...navData}
            className="row-start-2 col-span-3 items-center xl:col-start-2 xl:col-span-1"
          />
        </nav>
      </div>
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 snap-center">
        <ImageSlider className="flex-1 m-2 " imgPaths={imgPaths} />
        <div className="bg-red-600 flex p-10">
          <InfoCards {...cardsData} />
        </div>
      </div>
      <footer className="min-h-screen grid grid-cols-1 xl:grid-cols-3 snap-center">
        <InfoTile
          className={"col-span-2 bg-blue-400"}
          classNameMotion={"bg-red-500"}
          title={
            <>
              Skontaktuj się <br /> z nami
            </>
          }
        >
          {contactsData.map(({ name, ...props }, i) => (
            <a key={i} {...props}>
              {name}
            </a>
          ))}
        </InfoTile>
        <InfoTile title={"informacje"}>
          {infoData.map(({ name, ...props }, i) => (
            <a key={i} {...props}>
              {name}
            </a>
          ))}
        </InfoTile>
      </footer>
    </main>
  )
}
