"use client"
import AuthButton from "@/components/Auth"
import { Button } from "@/components/ui/button"
import { useCallback, useState } from "react"

export default function Admin() {
  const [res, setRes] = useState("")

  const post = useCallback(async () => {
    try {
      const r = await fetch("/api/edgeconfig", {
        method: "POST",
        body: JSON.stringify({
          label: "my edge config token label",
        }),
      })

      const body: { [key: string]: string } = await r.json()

      setRes(JSON.stringify(body))
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <div className="pt-10">
      <AuthButton />
      <Button onClick={post}>post</Button>
      <br />
      <article>{res}</article>
    </div>
  )
}
