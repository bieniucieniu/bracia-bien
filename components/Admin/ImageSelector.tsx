import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { forwardRef, useState } from "react"
import { Button } from "../ui/button"
import Image from "next/image"
import { toPl } from "@/lib/utils"
import { useAdminContext } from "./AdminContext"
import { twJoin, twMerge } from "tailwind-merge"

const ImageSelector = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    keyValue?: string
    disabled?: boolean
    onBlur?: () => void
    name?: string
    onImageSelect: (key: string) => void
  }
>(({ keyValue, disabled, onBlur, onImageSelect, className, ...props }, ref) => {
  const [open, setOpen] = useState<boolean>(false)
  const { imagesData } = useAdminContext()

  if (!imagesData) return <p>error</p>

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={twMerge("min-w-[138px]", className)}
          {...props}
          ref={ref}
          disabled={disabled}
        >
          Wybierz zdjecie
        </Button>
      </DialogTrigger>
      <DialogContent
        onBlur={onBlur}
        className="max-h-[calc(100svh_-_20px)] lg:max-w-[calc(100svw_-_100px)] overflow-auto"
      >
        <ul className="flex flex-row flex-wrap overflow-auto gap-4 p-2">
          {[...imagesData.values()].map(({ src, alt, key, categorie }) => (
            <Button
              asChild
              onClick={() => {
                onImageSelect(key)
                setOpen(false)
              }}
              key={key}
              className={twJoin(
                "p-0 m-0 h-fit flex flex-col",
                keyValue == key
                  ? "outline outline-2 outline-offset-2 outline-red-500"
                  : "",
              )}
            >
              <li>
                {src ? (
                  <Image
                    className="object-contain h-[150px] w-[200px]"
                    width={200}
                    height={150}
                    alt={alt ?? "image"}
                    src={src}
                  />
                ) : (
                  <p>image error</p>
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

ImageSelector.displayName = "ImageSelector"

export default ImageSelector
