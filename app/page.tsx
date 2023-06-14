"use client"
import ImageSlider from '@/components/ImageSlider'
import Navbar from '@/components/MainNavbar'

export default function Home() {
  return (
    <main style={{ scrollbarGutter: "stable" }}>
      <div className='min-h-screen flex flex-col flex-grow relative overflow-x-hidden' >
        <ImageSlider className="absolute top-0 left-0 w-screen h-screen" />
        <Navbar className='z-10' />
      </div>
      <div className='min-h-screen'>
      </div>
    </main>
  )
}
