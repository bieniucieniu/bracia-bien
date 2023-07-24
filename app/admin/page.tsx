"use client"
import AuthButton from "@/components/Auth"
import { useSession } from "next-auth/react"

export default function Admin() {
  const data = useSession()

  return (
    <div className="pt-10">
      <p>
        <AuthButton />
      </p>
      <p>{JSON.stringify(data)}</p>
    </div>
  )
}
