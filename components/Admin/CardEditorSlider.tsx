"use client"
import { z } from "zod"
import Slider from "../Slider"
import { CardEditor, formSchema } from "./CardEditor"
import { useCallback } from "react"
export default function CardEditorSlider({
  data,
  className,
}: {
  data: z.infer<typeof formSchema>[]
  className?: string
}) {
  if (!data.length) return <div>no data</div>

  return (
    <Slider
      className={className}
      renderer={(i) => {
        const d = data[i]
        if (d.id) return
        const onSubmit = useCallback(
          (e: z.infer<typeof formSchema>) => {
            if (!d.id) return
          },
          [data],
        )
        return <CardEditor {...d} onSubmit={onSubmit} />
      }}
      length={data.length}
    />
  )
}
