import { useSession } from "next-auth/react"

export type edgeConfigType = {
  mainImgKeys?: string[]
  currentImgKeys?: string[]
}
export async function setConfig(
  newConfig: edgeConfigType,
  onComplete?: (res: Response) => void,
) {
  const { data: session } = useSession()
  if (!session) return

  const res = await fetch("/api/edgeconfig", {
    method: "POST",
    body: JSON.stringify({
      config: newConfig,
    }),
  })

  onComplete && onComplete(res)
}
