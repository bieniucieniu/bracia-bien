"use client"
import type { insertImagesSchema } from "@/db/imagesData/serverApi"
import type { insertCardSchema } from "@/db/infoCard/serverApi"
import { createContext, useContext, useState } from "react"
import { z } from "zod"

type ImagesData = (z.infer<typeof insertImagesSchema> & { url?: string })[]
type InfoCards = z.infer<typeof insertCardSchema>[]

type AdminContext = {
  imagesData: ImagesData
  setImagesData: React.Dispatch<React.SetStateAction<ImagesData>>
  infoCards: InfoCards
  setInfoCards: React.Dispatch<React.SetStateAction<InfoCards>>
}

const adminContext = createContext<AdminContext | null>(null)

export function AdminContextProvider({
  imagesData: newImagesData,
  infoCards: newInfoCards,
  children,
}: {
  imagesData: ImagesData | undefined | null
  infoCards: InfoCards | undefined | null
  children: React.ReactNode
}) {
  const [imagesData, setImagesData] = useState<ImagesData>(
    () => structuredClone(newImagesData) ?? [],
  )
  const [infoCards, setInfoCards] = useState<InfoCards>(
    () => structuredClone(newInfoCards) ?? [],
  )

  return (
    <adminContext.Provider
      value={{ imagesData, setImagesData, infoCards, setInfoCards }}
    >
      {children}
    </adminContext.Provider>
  )
}

export function useAdminContext() {
  const context = useContext(adminContext)

  if (context === null) {
    throw new Error("not in admin context")
  }

  return context
}
