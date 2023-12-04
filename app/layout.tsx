import "./globals.css"
import { roboto } from "@/lib/fonts"
import Navbar from "@/components/MainLayout/Navbar"
import { AnimationProvider } from "@/components/MainLayout/Animation"
import { ThemeProvider } from "@/components/MainLayout/ThemeProvider"

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AnimationProvider>
            <Navbar />
            {children}
          </AnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
