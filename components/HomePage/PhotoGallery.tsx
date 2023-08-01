import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { twMerge } from "tailwind-merge"
import Image from "next/image"
export default function PhotoGalery({
  urls,
  className,
}: {
  urls: string[]
  className?: string
}) {
  return (
    <Card className={twMerge("h-full m-4", className)}>
      <CardHeader>
        <CardTitle>Photo galley</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <ScrollArea>
          <ul className="flex flex-row flex-wrap space-x-4 pb-4">
            {urls.map((e, i) => (
              <li>
                <Image src={e} alt={`photo-${i}`} height={300} width={400} />
              </li>
            ))}
          </ul>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
