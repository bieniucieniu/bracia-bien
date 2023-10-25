import "./globals.css"
import { roboto } from "@/lib/fonts"
import { Topbar } from "@/components/MainLayout/Navbar"

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
      <body
        className={`${roboto.className} overflow-auto snap-y snap-proximity h-screen`}
        style={{ scrollbarGutter: "stable" }}
      >
        <Topbar />
        {children}
      </body>
    </html>
  )
}
