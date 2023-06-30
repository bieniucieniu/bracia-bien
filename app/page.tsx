"use client"
import ImageSlider from "@/components/ImageSlider"
import Navbar from "@/components/MainNavbar"

export default function Home() {
  return (
    <main style={{ scrollbarGutter: "stable" }}>
      <div className="flex flex-col verflow-x-hidden min-h-screen">
        <Navbar />
        <ImageSlider className="flex-1" />
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
