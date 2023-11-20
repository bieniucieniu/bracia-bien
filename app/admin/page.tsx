import AuthButton from "@/components/Auth"
import { getAuth } from "@/lib/auth"
import { Uploader } from "@/components/Admin/Uploader"
import {
  getAllImagesData,
  populateImagesDataWithLinks,
} from "@/db/imagesData/serverApi"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ImagesDataEditor from "@/components/Admin/ImagesDataEditor"
import { AdminContextProvider } from "@/components/Admin/AdminContext"

export default async function Admin() {
  const auth = await getAuth()
  const imagesData = await populateImagesDataWithLinks(await getAllImagesData())

  if (!auth)
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
      <AdminContextProvider imagesData={imagesData} infoCards={[]}>
        <Card className="w-fit">
          <CardHeader>
            <CardTitle>Admin dashboard</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-around gap-x-3">
            <span>
              zalogowany jako{" "}
              <mark className="px-1 rounded">{auth.user?.name}</mark>
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
        </section>
        <ImagesDataEditor />
      </AdminContextProvider>
    </main>
  )
}
