"use client"
import { createContext, useContext, useState } from "react"

type ImagesData = { src: string; key: string }[]

type AdminContext = {
  imagesData: ImagesData
  setImagesData: React.Dispatch<React.SetStateAction<ImagesData>>
}

const adminContext = createContext<AdminContext | null>(null)

export function AdminContextProvider({
  imagesData: newImagesData,
  children,
}: {
  imagesData: { src: string; key: string }[]
  children: React.ReactNode
}) {
  const [imagesData, setImagesData] = useState<ImagesData>(() => newImagesData)
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
