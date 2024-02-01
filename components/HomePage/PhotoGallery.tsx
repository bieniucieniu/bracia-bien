import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
export default function PhotoGalery({
  data,
  className,
}: {
  data: {
    src: string
    name?: string
  }[]
  className?: string
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>galeria produktów</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row w-full justify-around gap-3 flex-wrap">
          {data.map(({ src, name }, i) => {
            if (!src) return null
            return (
              <Image
                key={name ?? `photo-${i}`}
                src={src}
                alt={name ?? `photo-${i}`}
                height={800}
                width={1920}
                className="w-full h-auto lg:w-auto lg:h-[240px] xl:h-[300px] object-contain rounded-xl shadow-sm"
              />
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
