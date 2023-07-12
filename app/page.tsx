import Contacts from "@/components/Contacts"
import ImageSlider from "@/components/ImageSlider"
import InfoCard from "@/components/InfoCard"
import Navbar from "@/components/MainNavbar"

export default function Home() {
    return (
        <main style={{ scrollbarGutter: "stable" }}>
            <div className="flex flex-col min-h-screen relative">
                <Navbar />
                <ImageSlider className="flex-1" />
            </div>
            <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
                <div className="bg-orange-50"></div>
                <div className="bg-red-600 flex p-10">
                    <InfoCard className="m-auto" />
                </div>
            </div>
            <footer className="min-h-screen grid grid-cols-1 xl:grid-cols-2">
                <Contacts />
            </footer>
        </main>
    )
}
