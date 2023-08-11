import AdminDashboard from "@/components/Admin/AdminDashboard"
import AuthButton from "@/components/Auth"
import authOptions from "@/lib/auth"
import { getServerSession } from "next-auth"
import { utapi } from "uploadthing/server"
import { getAll } from "@/db/postgres"

export default async function Admin() {
  const session = await getServerSession(authOptions)
  const { res: allImages } = await getAll()
  const imgsUrls = allImages.length
    ? await utapi.getFileUrls(allImages.map((k) => k.key))
    : []
  const imgsData = allImages.map((e) => {
    return {
      url: imgsUrls.find((u) => e.key === u.key)?.url,
      ...e,
    }
  })
  return session?.user ? (
    <AdminDashboard imgsData={imgsData} />
  ) : (
    <main className="h-screen w-screen flex flex-col gap-10 items-center justify-center">
      <AuthButton />
    </main>
  )
}
