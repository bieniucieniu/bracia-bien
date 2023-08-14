import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { imagesData } from "@/db/schema"
import { InferModel } from "drizzle-orm"
import Image from "next/image"
export default function PhotoGalery({
  data,
  className,
}: {
  data: (Omit<InferModel<typeof imagesData>, "categorie"> & { url: string })[]
  className?: string
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Photo galley</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row w-full justify-around gap-3 flex-wrap">
          {data.map(({ url, key, alt }, i) => (
            <Image
              key={key}
              src={url}
              alt={alt ?? `photo-${i}`}
              height={800}
              width={1920}
              className="w-full h-auto lg:w-auto lg:h-[240px] xl:h-[300px] object-contain rounded-xl shadow-sm"
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
