"use client"
import type { insertImagesSchema } from "@/db/imagesData/serverApi"
import { createContext, useContext, useState } from "react"
import { z } from "zod"

export type ImageData = z.infer<typeof insertImagesSchema>

type ImagesData = Map<
  string,
  Omit<ImageData, "key"> & {
    src?: string
    change: {
      alt?: ImageData["alt"]
      categorie?: ImageData["categorie"]
      delete?: true
    }
  }
>

type AdminContext = {
  imagesData: ImagesData
  setImagesData: React.Dispatch<React.SetStateAction<ImagesData>>
}

const adminContext = createContext<AdminContext | null>(null)

export function AdminContextProvider({
  imagesData: newImagesData,
  children,
}: {
  imagesData: ImagesData | undefined | null
  children: React.ReactNode
}) {
  const [imagesData, setImagesData] = useState<ImagesData>(
    () => new Map(newImagesData) ?? new Map(),
  )
  return (
    <adminContext.Provider value={{ imagesData, setImagesData }}>
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
