"use client"
import type { insertImagesSchema } from "@/db/imagesData/serverApi"
import { createContext, useContext, useState } from "react"
import { z } from "zod"

type ImagesData = (z.infer<typeof insertImagesSchema> & { src?: string })[]

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
    () => structuredClone(newImagesData) ?? [],
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
