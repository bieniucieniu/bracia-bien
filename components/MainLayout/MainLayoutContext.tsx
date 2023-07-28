import { createContext, useContext } from "react"
type Item = {
  trigger: React.ReactNode
} & (ItemLink | ItemDrop)

type ItemDrop = {
  content?: { href?: string; name?: string }[]

  href?: never
}

type ItemLink = {
  href?: string

  content?: never
}

type MainLayoutContext = {
  navigation: {
    main: Item[]
  }
  imgs: { main: string[]; current: string[] }
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

export function useMainLayoutManager(imgs?: {
  main: string[]
  current: string[]
}): MainLayoutContext {
  const imgPaths: MainLayoutContext["imgs"] = {
    main: [
      "/images/fotob-33.jpg",
      "/images/fotob-39.jpg",
      "/images/fotob-40.jpg",
    ],
    current: [],
  }

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
    imgs: imgs || imgPaths,
    cards,
  }
}
