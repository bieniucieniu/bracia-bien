"use client"
import ImageSlider from "@/components/ImageSlider"
import Navbar from "@/components/MainNavbar"

export default function Home() {
  return (
    <main style={{ scrollbarGutter: "stable" }}>
      <div className="min-h-screen flex flex-col flex-grow relative overflow-x-hidden">
        <Navbar className="z-10" />
        <ImageSlider className="absolute top-0 left-0 w-screen h-screen" />
      </div>
      <div className="min-h-screen"></div>
      <footer>
        <div>
          <h1>Skontaktuj się z nami</h1>
          <p>+48 502 896 299</p>
          <p></p>
          <p>Stawiszyńska 125, 62-800 Kalisz</p>
        </div>
      </footer>
    </main>
  )
}
