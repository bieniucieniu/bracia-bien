import "./globals.css"
import { roboto } from "@/lib/fonts"
import Navbar from "@/components/MainLayout/Navbar"

export const metadata = {
  title: "Bracia Bien",
  description: "bielizna skarpetki pizamy",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={roboto.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
