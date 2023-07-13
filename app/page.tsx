import Contacts from "@/components/Contacts"
import ImageSlider from "@/components/ImageSlider"
import InfoCards from "@/components/InfoCards"
import Informations from "@/components/Informations"
import Navbar from "@/components/MainNavbar"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"

const imgPaths: string[] = [
    "/images/fotob-33.jpg",
    "/images/fotob-39.jpg",
    "/images/fotob-40.jpg",
]

const cardsData: Parameters<typeof InfoCards>[0] = {
    cards: [{ className: "m-auto" }],
}

const contactsData: Parameters<typeof Contacts>[0] = {
    title: (
        <>
            Skontaktuj się
            <br /> z nami
        </>
    ),
    contacts: [
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
                <Contacts {...contactsData}>
                    <Sheet>
                        <SheetTrigger className="text-sm">
                            wiecej informacji
                        </SheetTrigger>
                        <SheetContent side={"left"} className="min-w-[50vw]">
                            <SheetHeader>
                                <SheetTitle>
                                    <Link
                                        href="info"
                                        className="hover:underline"
                                    >
                                        Informacje
                                    </Link>
                                </SheetTitle>
                                <SheetDescription>
                                    <Link
                                        target="_blank"
                                        href="info"
                                        className="hover:underline"
                                    >
                                        otworz w nowej karcie {">>"}
                                    </Link>
                                </SheetDescription>
                                <Informations />
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </Contacts>
            </footer>
        </main>
    )
}
