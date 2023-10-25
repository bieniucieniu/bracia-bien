import { AdminContextProvider } from "@/components/Admin/AdminContext"
import AuthButton from "@/components/Auth"
import {
  getAllImagesData,
  populateImagesDataWithLinks,
} from "@/db/imagesData/serverApi"
import { getAuth } from "@/lib/auth"

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
      <div className="fixed bottom-0 inset-x-0 bg-white z-50 flex justify-between items-center p-4 border-t shadow-inner">
        <span>
          zalogowany jako{" "}
          <mark className="px-1 rounded">{auth.user?.name}</mark>
        </span>
        <AuthButton signed className="inline-block self-end" />
      </div>

      {children}
    </AdminContextProvider>
  )
}
