import { MenuItem, MenuRoot } from "@/components/PillMenu"
import { playfair } from "@/lib/fonts"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { twMerge } from "tailwind-merge"
import { AnimateContentMain } from "@/components/MainLayout/Animation"
import Banner from "@/components/HomePage/Banner"
import ShopesBanner from "@/components/HomePage/ShopsBanner"
import { ArrowRight } from "lucide-react"

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
  return (
    <AnimateContentMain>
      <div className="mt-[124px] md:mt-[52px] min-h-[600px] sm:min-h-screen pt-4 grid px-4 overflow-x-hidden">
        <Banner swapAfter={2000} />
      </div>
      <section id="about" className="bg-red-400 dark:bg-red-900 py-10">
        <div className="mx-auto px-20 flex flex-col sm:grid grid-cols-6 gap-x-3 gap-y-4">
          <div className="col-span-2 hidden lg:flex justify-center items-center">
            <Image
              src="/bracia_bien.jpg"
              alt="hurtownia"
              width={900}
              height={600}
              className="w-full h-auto rounded-xl object-contain"
            />
          </div>
          <Card className="col-start-2 col-span-3 lg:col-span-2 bg-orange-100 dark:bg-orange-950 pr-5">
            <CardHeader className={twMerge(playfair.className, "pb-2")}>
              <CardTitle>Bracia Bien</CardTitle>
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
          </Card>
          <Card className="col-start-2 col-span-3">
            <CardTitle
              className={twMerge(
                playfair.className,
                "px-10 py-6 flex flex-row justify-between items-center",
              )}
            >
              Zapraszamy takze do naszych sklepow w Kaliszu{" "}
              <ArrowRight className="hidden sm:inline-block" />
            </CardTitle>
          </Card>
          <div className="overflow-hidden grid w-full col-start-5 col-span-2 row-start-1 row-span-2 mx-auto sm:mx-0 min-h-[380px] max-w-[300px]">
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
