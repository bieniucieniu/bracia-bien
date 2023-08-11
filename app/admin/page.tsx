import AdminDashboard from "@/components/Admin/AdminDashboard"
import AuthButton from "@/components/Auth"
import { Button } from "@/components/ui/button"
import authOptions from "@/lib/auth"
import { getServerSession } from "next-auth"
import Link from "next/link"

export default async function Admin() {
  const session = await getServerSession(authOptions)
  return session?.user ? (
    <AdminDashboard />
  ) : (
    <main className="h-screen w-screen flex flex-col gap-10 items-center justify-center">
      <AuthButton />
    </main>
  )
}
