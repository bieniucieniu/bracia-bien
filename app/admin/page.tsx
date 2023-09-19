import AuthButton from "@/components/Auth"
import authOptions from "@/lib/auth"
import { getServerSession } from "next-auth"
import { utapi } from "uploadthing/server"
import { Uploader } from "@/components/Admin/Uploader"
import { getAllImagesData } from "@/db/imagesData/serverApi"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CardCreator, CardEditorSlider } from "@/components/Admin/CardDashboard"
import ImageSelesctor from "@/components/Admin/ImageDataEditor"
import { AdminContextProvider } from "@/components/Admin/AdminContext"

export default async function Admin() {
  const session = await getServerSession(authOptions)
  const { res: allImages, error } = await getAllImagesData()
  if (error) console.log(error)
  const imgsUrls =
    allImages && allImages.length
      ? await utapi.getFileUrls(allImages.map((k) => k.key))
      : []
  const imgsData =
    allImages && allImages.length
      ? allImages.map((e) => {
          return {
            url: imgsUrls.find((u) => e.key === u.key)?.url,
            ...e,
          }
        })
      : []

  if (!session?.user)
    return (
      <main
        style={{ scrollbarGutter: "stable" }}
        className="h-screen w-screen flex flex-col gap-10 items-center justify-center"
      >
        <AuthButton />
      </main>
    )

  return (
    <main className="px-10 pt-20 pb-4 flex flex-col gap-4 relative ">
      <AdminContextProvider imagesData={imgsData}>
        <Card className="w-fit">
          <CardHeader>
            <CardTitle>Admin dashboard</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-around gap-x-3">
            <span>
              zalogowany jako{" "}
              <mark className="px-1 rounded">{session?.user?.name}</mark>
            </span>
            <AuthButton signed className="inline-block self-end" />
          </CardContent>
        </Card>
        <section className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-10">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Uploader</CardTitle>
            </CardHeader>
            <CardContent>
              <Uploader />
            </CardContent>
          </Card>
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Nowa karta</CardTitle>
            </CardHeader>
            <CardContent>
              <CardCreator />
            </CardContent>
          </Card>
          <Card className="flex flex-col lg:col-span-2 2xl:col-span-1">
            <CardHeader>
              <CardTitle>Admin dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <CardEditorSlider data={[]} />
            </CardContent>
          </Card>
        </section>
        <ImageSelesctor />
      </AdminContextProvider>
    </main>
  )
}
