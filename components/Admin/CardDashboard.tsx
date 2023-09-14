"use client"
import { z } from "zod"
import Slider from "../Slider"
import CardEditor from "./CardEditor"
import { insertCardSchema } from "@/db/infoCard/serverApi"
import { addInfoCards, updateInfoCards } from "@/db/clientApi"
export function CardEditorSlider({
  data,
  className,
}: {
  data: z.infer<typeof insertCardSchema>[]
  className?: string
}) {
  if (!data.length) return <div>no data</div>

  return (
    <Slider
      className={className}
      renderer={(i) => {
        const d = data[i]
        const id = d.id

        return id ? (
          <CardEditor
            data={d}
            onSubmit={(update) => {
              updateInfoCards([{ ids: [{ id }], update }], (res) =>
                console.log(res),
              )
            }}
          />
        ) : null
      }}
      length={data.length}
    />
  )
}

export function CardCreator() {
  return (
    <CardEditor
      onSubmit={(data) => {
        console.log(data)
        addInfoCards([data])
      }}
    />
  )
}
