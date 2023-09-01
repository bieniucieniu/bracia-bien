import AdminDashboard from "@/components/Admin/AdminDashboard"
import AuthButton from "@/components/Auth"
import authOptions from "@/lib/auth"
import { getServerSession } from "next-auth"
import { utapi } from "uploadthing/server"

import { getAllImagesData } from "@/db/imagesData/serverApi"

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
  return session?.user ? (
    <AdminDashboard imgsData={imgsData} />
  ) : (
    <main
      style={{ scrollbarGutter: "stable" }}
      className="h-screen w-screen flex flex-col gap-10 items-center justify-center"
    >
      <AuthButton />
    </main>
  )
}
