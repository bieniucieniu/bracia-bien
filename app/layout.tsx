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
    <html lang="en">
      <body
        className={`${roboto.className} scroll-smooth overflow-auto snap-y snap-proximity h-screen`}
        style={{ scrollbarGutter: "stable", scrollBehavior: "smooth" }}
      >
        <Topbar />
        {children}
      </body>
    </html>
  )
}
