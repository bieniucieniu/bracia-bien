import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { imagesData } from "@/db/schema/imagesData"
import { InferInsertModel } from "drizzle-orm"
import Image from "next/image"
import { Button } from "../ui/button"

type imgData = InferInsertModel<typeof imagesData> & { url: string | undefined }

export default function ImageSelector({
  data,
  onSelect,
}: {
  data: imgData[]
  onSelect: (data: imgData) => void
}) {
  return (
    <Dialog>
      <DialogTrigger>Wybierz zdjecie</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
        </DialogHeader>
        <ul className="flex flex-wrap justify-start items-start">
          {data.map((d) =>
            d.url ? (
              <Button onClick={() => onSelect(d)} asChild>
                <Image alt={d.alt ?? ""} src={d.url} width={400} height={300} />
              </Button>
            ) : (
              <p>error with {d.key}</p>
            ),
          )}
        </ul>
      </DialogContent>
    </Dialog>
  )
}
