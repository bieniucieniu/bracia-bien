import "./globals.css"
import { roboto } from "./fonts"
import { Topbar } from "@/components/MainLayout/Navbar"
import { AuthProvider } from "@/components/providers"

export const metadata = {
  title: "Bracia Bien",
  description: "bielizna skarpetki",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${roboto.className} scroll-smooth overflow-auto snap-y snap-proximity h-screen`}
          style={{ scrollbarGutter: "stable" }}
        >
          <Topbar />
          {children}
        </body>
      </AuthProvider>
    </html>
  )
}
