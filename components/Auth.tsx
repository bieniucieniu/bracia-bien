"use client"
import { signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function AuthButton({
  className,
  signed,
}: {
  className?: string
  signed?: boolean
}) {
  return signed ? (
    <>
      <Button className={className} onClick={() => signOut()}>
        Sign out
      </Button>
    </>
  ) : (
    <>
      <Button className={className} onClick={() => signIn()}>
        Sign in
      </Button>
    </>
  )
}
