import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { forwardRef, useState } from "react"
import { getImagesData } from "@/db/clientApi"
import { Button } from "../ui/button"
import Image from "next/image"
import { toPl } from "@/lib/utils"

const ImageSelector = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    keyValue?: string
    disabled?: boolean
    onBlur?: () => void
    name?: string
    onImageSelect: (key: string) => void
  }
>(({ disabled, onBlur, name, onImageSelect }, ref) => {
  const [open, setOpen] = useState<boolean>(false)
  const [imgsData, setImgsData] = useState<
    Awaited<ReturnType<typeof getImagesData>>
  >([])

  if (!imgsData || imgsData instanceof Error) return <p>error</p>

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          onClick={() => getImagesData((data) => data && setImgsData(data))}
        >
          Wybierz zdjecie
        </Button>
      </DialogTrigger>
      <DialogDescription>{name}</DialogDescription>
      <DialogContent className="max-h-[calc(100svh_-_20px)] lg:max-w-[calc(100svw_-_100px)] overflow-auto">
        <ul className="flex flex-row flex-wrap overflow-auto gap-4">
          {imgsData.map(({ url, alt, key, categorie }) => (
            <Button
              asChild
              onClick={() => {
                onImageSelect(key)
                setOpen(false)
              }}
              key={key}
              className="p-0 m-0 h-fit flex flex-col"
            >
              <li>
                {url ? (
                  <Image
                    className="object-contain h-[150px] w-[200px]"
                    width={200}
                    height={150}
                    alt={alt ?? "image"}
                    src={url}
                  />
                ) : (
                  <p>inage error</p>
                )}
                <p>{toPl(categorie)}</p>
              </li>
            </Button>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  )
})

export default ImageSelector
