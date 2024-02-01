import PhotoGalery from "@/components/HomePage/PhotoGallery"
import { AnimateContentMain } from "@/components/MainLayout/Animation"
import { UTApi } from "uploadthing/server"
export default async function Gallery() {
  const api = new UTApi()
  const list = await api.listFiles({})
  const data = (await api.getFileUrls(list.map((e) => e.key))).map((e) => {
    const name = e.key.split("_")
    name.shift()
    return {
      name: name.join("_"),
      src: e.url,
    }
  })

  return (
    <AnimateContentMain>
      <div className="mt-[124px]">
        {data.length > 0 ? (
          <PhotoGalery
            data={data}
            className="h-[calc(100vh_-_32px)] w-[calc(100vw_-_32px)]"
          />
        ) : (
          <h2 className="mx-auto w-fit">brak zdjęć</h2>
        )}
      </div>
    </AnimateContentMain>
  )
}
