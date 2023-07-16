import InfoTile from "@/components/InfoTile"
import ImageSlider from "@/components/ImageSlider"
import InfoCards from "@/components/InfoCards"
import Navbar from "@/components/MainNavbar"

const imgPaths: string[] = [
    "/images/fotob-33.jpg",
    "/images/fotob-39.jpg",
    "/images/fotob-40.jpg",
]

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
                <Navbar items={[]} />
            </div>
            <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 snap-center">
                <ImageSlider className="flex-1 m-2 " imgPaths={imgPaths} />
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
