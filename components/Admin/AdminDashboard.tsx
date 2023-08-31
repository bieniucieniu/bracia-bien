import AuthButton from "@/components/Auth"
import { Uploader } from "./Uploader"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ImageSelesctor from "./ImageSelector"
import { InferModel } from "drizzle-orm"
import { imagesData } from "@/db/schema/image"
export interface ImgData extends InferModel<typeof imagesData> {
  url: string | undefined
}
export default function AdminDashboard({ imgsData }: { imgsData: ImgData[] }) {
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
          <Uploader />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      <ImageSelesctor imgsData={imgsData} />
    </main>
  )
}
