import AuthButton from "@/components/Auth"
import authOptions from "@/lib/auth"
import { getServerSession } from "next-auth"
import { utapi } from "uploadthing/server"
import { Uploader } from "@/components/Admin/Uploader"
import { getAllImagesData } from "@/db/imagesData/serverApi"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { CardCreator, CardEditorSlider } from "@/components/Admin/CardDashboard"
import ImageSelesctor from "@/components/Admin/ImageSelector"

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
    <main className="pt-20 pb-4 flex flex-col gap-4 relative">
      <section className="flex flex-row justify-around">
        <Card className="flex flex-col w-fit m-auto max-w-6xl">
          <CardHeader>
            <CardTitle>Admin dashboard</CardTitle>
            <CardDescription className="flex items-center justify-around">
              <span>
                zalogowany jako{" "}
                <mark className="px-1 rounded">{session?.user?.name}</mark>
              </span>
              <AuthButton signed className="inline-block self-end" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Uploader />
          </CardContent>
        </Card>
        <Card className="flex flex-col w-fit m-auto max-w-6xl">
          <CardHeader>
            <CardTitle>Admin dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <CardEditorSlider data={[]} />
          </CardContent>
          <CardContent>
            <CardCreator />
          </CardContent>
        </Card>
      </section>
      <ImageSelesctor imgsData={imgsData} />
    </main>
  )
}
