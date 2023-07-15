import InfoTile from "@/components/InfoTile"
import ImageSlider from "@/components/ImageSlider"
import InfoCards from "@/components/InfoCards"
import Navbar from "@/components/MainNavbar"
import { trace } from "console"

const imgPaths: string[] = [
    "/images/fotob-33.jpg",
    "/images/fotob-39.jpg",
    "/images/fotob-40.jpg",
]

const cardsData: Parameters<typeof InfoCards>[0] = {
    cards: [{ className: "m-auto" }],
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
    className: { fg: "bg-red-500", bg: "bg-blue-400" },
    data: [
        {
            name: "Polityka Prywatnosci",
            href: "/downlaods/polityka_prywatnosci.pdf",
            rel: "noopener noreferrer",
        },
        {
            name: "Platnosc",
            href: "/downlaods/platnosc.pdf",
            rel: "noopener noreferrer",
        },
        {
            name: "regulamin sklepu",
            href: "/downlaods/regulamin_sklepu.pdf",
            rel: "noopener noreferrer",
        },
        {
            name: "wysylka",
            href: "/downlaods/wysylka.pdf",
            rel: "noopener noreferrer",
        },
    ],
}

export default function Home() {
    return (
        <main style={{ scrollbarGutter: "stable" }}>
            <div className="flex flex-col min-h-screen relative bg-yellow-200">
                <Navbar items={[]} />
                <ImageSlider className="flex-1" imgPaths={imgPaths} />
            </div>
            <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
                <div className="bg-orange-50"></div>
                <div className="bg-red-600 flex p-10">
                    <InfoCards {...cardsData} />
                </div>
            </div>
            <footer className="min-h-screen grid grid-cols-1 xl:grid-cols-2">
                <InfoTile {...contactsData} />
                <InfoTile {...infoData} />
            </footer>
        </main>
    )
}
