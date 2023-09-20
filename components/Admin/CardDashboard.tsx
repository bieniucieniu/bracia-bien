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
        const { id, ...d } = data[i]

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
      autoSlide={false}
      length={data.length}
    />
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
