import AuthButton from "@/components/Auth"
import { Uploader } from "./Uploader"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import ImageSelesctor from "./ImageSelector"
import { InferInsertModel } from "drizzle-orm"
import { imagesData } from "@/db/schema/imagesData"
import { getServerSession } from "next-auth"
export interface ImgData extends InferInsertModel<typeof imagesData> {
  url: string | undefined
}
export default async function AdminDashboard({
  imgsData,
}: {
  imgsData: ImgData[]
}) {
  const session = await getServerSession()
  return (
    <main className="pt-20 pb-4 flex flex-col gap-4 relative">
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
      <ImageSelesctor imgsData={imgsData} />
    </main>
  )
}
