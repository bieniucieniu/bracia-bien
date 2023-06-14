import ImageSlider from '@/components/ImageSlider'
import Navbar from '@/components/MainNavbar'

export default function Home() {
  return (
    <main style={{ scrollbarGutter: "stable" }}>
      <div className='min-h-screen flex flex-col flex-grow relative' >
        <Navbar />
        <ImageSlider className="absolute top-0 left-0 -z-10 inset-0 w-screen h-screen" />
      </div>
      <div className='min-h-screen'>
      </div>
    </main>
  )
}
