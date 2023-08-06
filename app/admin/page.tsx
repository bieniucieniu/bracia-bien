import AuthButton from "@/components/Auth"
import { Button } from "@/components/ui/button"
import authOptions from "@/lib/auth"
import { getServerSession } from "next-auth"
import Link from "next/link"

export default async function Admin() {
  const session = await getServerSession(authOptions)
  return (
    <div className="h-screen w-screen flex flex-col gap-10 items-center justify-center">
      <AuthButton />
      {session?.user ? (
        <Button size="lg" asChild>
          <Link href="/admin/upload">upload files</Link>
        </Button>
      ) : null}
    </div>
  )
}
