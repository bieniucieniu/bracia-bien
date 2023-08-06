import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
export default function PhotoGalery({
  urls,
  className,
}: {
  urls: string[]
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
          {urls.map((e, i) => (
            <Image
              key={i}
              src={e}
              alt={`photo-${i}`}
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
