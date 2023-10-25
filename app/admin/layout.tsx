import { AdminContextProvider } from "@/components/Admin/AdminContext"
import AuthButton from "@/components/Auth"
import {
  getAllImagesData,
  populateImagesDataWithLinks,
} from "@/db/imagesData/serverApi"
import { getAuth } from "@/lib/auth"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "admin page",
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
    <AdminContextProvider imagesData={imagesData}>
      <Card className="pt-24 lg:pt-16">
        <CardContent className="flex items-center justify-between gap-x-3">
          <span>
            zalogowany jako{" "}
            <mark className="px-1 rounded">{auth.user?.name}</mark>
          </span>
          <AuthButton signed className="inline-block self-end" />
        </CardContent>
      </Card>

      {children}
    </AdminContextProvider>
  )
}
