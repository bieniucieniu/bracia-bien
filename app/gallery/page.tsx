import PhotoGalery from "@/components/HomePage/PhotoGallery"
import { AnimateContentMain } from "@/components/MainLayout/Animation"
export default async function Gallery() {
  let galleryImgs: { src?: string }[] = []

  return (
    <AnimateContentMain>
      <div className="mt-[124px]">
        {galleryImgs.length > 0 ? (
          <PhotoGalery
            data={galleryImgs}
            className="h-[calc(100vh_-_32px)] w-[calc(100vw_-_32px)]"
          />
        ) : (
          <h2 className="mx-auto w-fit">brak zdjęć</h2>
        )}
      </div>
    </AnimateContentMain>
  )
}
