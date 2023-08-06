"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { twMerge } from "tailwind-merge"

export default function AuthButton({ className }: { className?: string }) {
  const { data: session } = useSession()

  return (
    <div
      className={twMerge(
        "flex flex-row items-center gap-2 w-fit h-fit px-2 py-1 rounded-md text-sm font-medium transition-colors border border-input bg-background shadow-sm",
        className,
      )}
    >
      {session ? (
        <>
          <span>Signed in as {session.user?.name}</span>
          <Button onClick={() => signOut()}>Sign out</Button>
        </>
      ) : (
        <>
          <span>Not signed in</span>
          <Button onClick={() => signIn()}>Sign in</Button>
        </>
      )}
    </div>
  )
}
