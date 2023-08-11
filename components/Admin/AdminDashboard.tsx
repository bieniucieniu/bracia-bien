import AuthButton from "@/components/Auth"
import { UploadZone } from "./Uploader"
// import { getAll } from "@vercel/edge-config"
import { utapi } from "uploadthing/server"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ImageSelesctor from "./ImageSelector"
// import { edgeConfigSchema } from "@/lib/edgeconfig"
import { z } from "zod"
import { getAll } from "@/db/postgres"

export default async function AdminDashboard() {
  // const currentEdgeConifg: z.infer<typeof edgeConfigSchema> = await getAll()
  const { res: allImages } = await getAll()
  const imgsUrls = allImages.length
    ? await utapi.getFileUrls(allImages.map((k) => k.key))
    : []
  const imgsData = allImages.map((e, i) => {
    return {
      url: imgsUrls[i].url,
      ...e,
    }
  })

  return (
    <main className="pt-20 pb-4 flex flex-col gap-4 relative">
      <Card className="flex flex-col w-fit m-auto max-w-6xl">
        <CardHeader>
          <CardTitle>Admin dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <AuthButton className="m-auto" />
        </CardContent>

        <CardContent>
          <UploadZone />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      {allImages.length ? <ImageSelesctor imgsData={imgsData} /> : "no imgs"}
    </main>
  )
}
