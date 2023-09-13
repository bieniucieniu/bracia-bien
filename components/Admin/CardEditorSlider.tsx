"use client"
import { z } from "zod"
import Slider from "../Slider"
import CardEditor from "./CardEditor"
import { insertCardSchema } from "@/db/infoCard/serverApi"
import { updateInfoCards } from "@/db/clientApi"
export default function CardEditorSlider({
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
            {...d}
            onSubmit={async (update) => {
              await updateInfoCards([{ ids: [{ id }], update }])
            }}
          />
        ) : null
      }}
      length={data.length}
    />
  )
}
