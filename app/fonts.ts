import { Playfair_Display, Roboto_Slab } from "next/font/google"

export const roboto = Roboto_Slab({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
})

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})
