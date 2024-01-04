"use client"
import { createContext, useContext, useState } from "react"

type ImagesData = Map<string, { src?: string }>

type AdminContext = {
  imagesData: ImagesData
  setImagesData: React.Dispatch<React.SetStateAction<ImagesData>>
}

const adminContext = createContext<AdminContext | null>(null)

export function AdminContextProvider({
  imagesData: newImagesData,
  children,
}: {
  imagesData: { src?: string }[] | undefined | null
  children: React.ReactNode
}) {
  const [imagesData, setImagesData] = useState<ImagesData>(() => {
    const map: ImagesData = new Map()
    newImagesData?.forEach((img) => {
      map.set(img.src?.split("_")[0] ?? "", {
        ...img,
      })
    })
    return map
  })
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
