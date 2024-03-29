import "./globals.css"
import { roboto } from "@/lib/fonts"
import Navbar from "@/components/MainLayout/Navbar"
import { AnimationProvider } from "@/components/MainLayout/Animation"
import { ThemeProvider } from "@/components/MainLayout/ThemeProvider"
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin"
import { extractRouterConfig } from "uploadthing/server"
import { fileRouter } from "@/app/api/uploadthing/core"

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
      <body style={{ scrollbarGutter: "stable" }} className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AnimationProvider>
            <NextSSRPlugin routerConfig={extractRouterConfig(fileRouter)} />
            <Navbar />
            {children}
          </AnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
