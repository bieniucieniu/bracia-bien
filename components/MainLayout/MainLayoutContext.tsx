import type { Item } from "@/components/MainNavbar"
import { createContext, useContext } from "react"
type MainLayoutContext = {
  navigation: {
    main: Item[]
  }
  imgPaths: string[]
  cards: {
    title?: string
    description?: string
    children?: React.ReactNode
    footer?: React.ReactNode
  }[]
}

export const MainLayoutContext = createContext<MainLayoutContext | null>(null)

export function useMainLayoutContext() {
  const context = useContext(MainLayoutContext)

  if (context === null) {
    throw new Error(
      "useMainLayoutContext must be called in a child of MainLayoutContext.Provider",
    )
  }

  return context
}

export function useMainLayoutManager(): MainLayoutContext {
  const imgPaths: MainLayoutContext["imgPaths"] = [
    "/images/fotob-33.jpg",
    "/images/fotob-39.jpg",
    "/images/fotob-40.jpg",
  ]

  const main: MainLayoutContext["navigation"]["main"] = [
    {
      trigger: "Ona",
      content: [
        { href: "", name: "bielzna" },
        { href: "", name: "rajstopy" },
        { href: "", name: "skarpetki" },
        { href: "", name: "pizamy" },
      ],
    },
    {
      trigger: "On",
      content: [
        { href: "", name: "bielzna" },
        { href: "", name: "skarpetki" },
        { href: "", name: "pizamy" },
      ],
    },
    {
      trigger: "dzieci",
      content: [
        { href: "", name: "bielzna" },
        { href: "", name: "skarpetki" },
        { href: "", name: "pizamy" },
      ],
    },
    { trigger: "inne", href: "" },
  ]

  const cards: MainLayoutContext["cards"] = [{}]

  return {
    navigation: {
      main,
    },
    imgPaths,
    cards,
  }
}
