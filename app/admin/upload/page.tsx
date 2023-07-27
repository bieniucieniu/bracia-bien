import AuthButton from "@/components/Auth"
import { UploadZone } from "@/components/Upload"
import { get } from "@vercel/edge-config"
import { utapi } from "uploadthing/server"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getServerSession } from "next-auth"
import authOptions from "@/lib/auth"
import { ArrowUpIcon } from "@radix-ui/react-icons"

export default async function Upload() {
  const filesKeys = await get("mainImgKeys")
  const session = await getServerSession(authOptions)

  const filelinks = filesKeys
    ? utapi.getFileUrls(filesKeys.valueOf() as string[])
    : undefined

  return (
    <main className="pt-20">
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
    </main>
  )
}
