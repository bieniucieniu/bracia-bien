import { AdminContextProvider } from "@/components/Admin/AdminContext"
import AuthButton from "@/components/Auth"
import { getAuth } from "@/lib/auth"
import { UTApi } from "uploadthing/server"

export const metadata = {
  title: "admin page",
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const utapi = new UTApi()
  const auth = await getAuth()

  if (!auth)
    return (
      <main
        style={{ scrollbarGutter: "stable" }}
        className="h-screen w-screen flex flex-col gap-10 items-center justify-center"
      >
        <AuthButton />
      </main>
    )

  const data =
    (await utapi.getFileUrls((await utapi.listFiles({})).map((e) => e.key))) ??
    []

  return (
    <AdminContextProvider
      imagesData={data.map((e) => ({ key: e.key, src: e.url }))}
    >
      <div className="fixed bottom-0 inset-x-0 bg-white z-50 flex justify-between items-center p-4 border-t shadow-inner">
        <span>
          zalogowany jako <mark className="px-1 rounded">{auth.name}</mark>
        </span>
        <AuthButton signed className="inline-block self-end" />
      </div>

      {children}
    </AdminContextProvider>
  )
}
