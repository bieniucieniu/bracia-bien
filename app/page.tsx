"use client"
import Contacts from "@/components/Contacts"
import ImageSlider from "@/components/ImageSlider"
import Navbar from "@/components/MainNavbar"

export default function Home() {
  return (
    <main style={{ scrollbarGutter: "stable" }}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <ImageSlider className="flex-1" />
      </div>
      <div className="min-h-screen"></div>
      <footer className="min-h-screen grid grid-cols-2">
        <Contacts />
      </footer>
    </main>
  )
}
