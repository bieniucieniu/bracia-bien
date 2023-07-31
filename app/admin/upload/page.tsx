import AuthButton from "@/components/Auth"
import { UploadZone } from "@/components/admin/Upload"
import { getAll } from "@vercel/edge-config"
import { utapi } from "uploadthing/server"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getServerSession } from "next-auth"
import authOptions from "@/lib/auth"
import { ArrowUpIcon } from "@radix-ui/react-icons"
import ImageSelesctor from "@/components/admin/ImageSelector"
import { listFiles } from "@/utils/uploadthing"
import { edgeConfigType } from "@/lib/edgeconfig"

export default async function Upload() {
  const currentEdgeConifg: edgeConfigType = await getAll()
  const session = await getServerSession(authOptions)
  const keys = await listFiles()
  const imgsData = keys
    ? await utapi.getFileUrls(keys.map((k) => k.key))
    : undefined

  return (
    <main className="pt-20 pb-4 flex flex-col gap-4 relative">
      <Card className="flex flex-col w-fit m-auto max-w-6xl">
        <CardHeader>
          <CardTitle>Upload Module</CardTitle>
        </CardHeader>
        <CardContent>
          <AuthButton className="m-auto" />
        </CardContent>

        {session?.user ? (
          <>
            <CardContent>
              <UploadZone />
            </CardContent>
            <CardFooter></CardFooter>
          </>
        ) : (
          <CardContent className="flex justify-around">
            <ArrowUpIcon />
            login
            <ArrowUpIcon />
          </CardContent>
        )}
      </Card>
      {session ? (
        imgsData ? (
          <ImageSelesctor imgsData={imgsData} config={currentEdgeConifg} />
        ) : (
          "no imgs"
        )
      ) : (
        "log in"
      )}
    </main>
  )
}
