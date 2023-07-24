import { AuthProvider } from "./providers"

export default function layout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}
