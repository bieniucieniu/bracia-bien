import PhotoGalery from "@/components/HomePage/PhotoGallery"
import { AnimateContentMain } from "@/components/MainLayout/Animation"
import {
  getAllImagesData,
  populateImagesDataWithLinks,
} from "@/db/imagesData/serverApi"

export default async function Gallery() {
  const imgsData = await populateImagesDataWithLinks(await getAllImagesData())

  let galleryImgs: typeof imgsData = []

  if (imgsData instanceof Array) {
    imgsData.forEach((e) => {
      switch (e.categorie) {
        case "gallery":
          galleryImgs.push(e)
      }
    })
  }

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
