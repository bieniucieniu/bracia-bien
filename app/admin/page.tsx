import AuthButton from "@/components/Auth"
import authOptions from "@/lib/auth"
import { getServerSession } from "next-auth"
import Link from "next/link"

export default async function Admin() {
  const session = await getServerSession(authOptions)
  return (
    <div className="pt-10">
      <AuthButton />
      {session ? <Link href="/admin/upload">upload files</Link> : null}
    </div>
  )
}
