"use client"
import AuthButton from "@/components/Auth"
import { useSession } from "next-auth/react"
import Link from "next/link"

export default async function Admin() {
  const { data } = useSession()
  return (
    <div className="pt-10">
      <p>
        <AuthButton />
        {data ? <Link href="admin/upload"></Link> : "not loged in"}
      </p>
    </div>
  )
}
