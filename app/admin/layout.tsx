import NextAuthProvider from "./providers"

export default function layout({ children }: { children: React.ReactNode }) {
  return <NextAuthProvider>{children}</NextAuthProvider>
}
