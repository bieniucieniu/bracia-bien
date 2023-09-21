"use client"
import { z } from "zod"
import Slider from "../Slider"
import CardEditor from "./CardEditor"
import { insertCardSchema } from "@/db/infoCard/serverApi"
import { addInfoCards, deleteInfoCards, updateInfoCards } from "@/db/clientApi"
import { Button } from "../ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"

export function CardEditorSlider({
  data,
  className,
}: {
  data: z.infer<typeof insertCardSchema>[]
  className?: string
}) {
  if (!data.length) return <div>no data</div>

  return (
    <>
      <Slider
        className={className}
        renderer={(i) => {
          const { id, ...d } = data[i]

          return id ? (
            <CardEditor
              data={d}
              className="w-[calc(100%_-_105px)]"
              onSubmit={(update) => {
                updateInfoCards([{ ids: [id], update }], (res) =>
                  console.log(res),
                )
              }}
            >
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>reset</AlertDialogTitle>
                    <AlertDialogDescription>
                      are you sure
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() =>
                        deleteInfoCards([id], async (e) => {
                          console.log(e)
                          const json = await e?.json()
                          console.log(json)
                        })
                      }
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardEditor>
          ) : null
        }}
        autoSlide={false}
        length={data.length}
      />
    </>
  )
}
export function CardCreator() {
  return (
    <CardEditor
      onSubmit={(data) => {
        addInfoCards([data])
      }}
    />
  )
}
