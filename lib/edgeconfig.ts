import { getServerSession } from "next-auth"
import { z } from "zod"
import authOptions from "./auth"
import { NextResponse } from "next/server"

export const edgeConfigSchema = z.object({
  currentImgKeys: z.string().array().optional(),
  mainImgKeys: z.string().array().optional(),
})

export async function setConfig(
  newConfig: z.infer<typeof edgeConfigSchema>,
  onComplete?: (res: Response) => void,
) {
  const res = await fetch("/api/edgeconfig", {
    method: "POST",
    body: JSON.stringify(newConfig),
  })

  onComplete && onComplete(res)
}

export async function edgeConfigHandler(req: Request) {
  const allowed = ["bienmikolaj@gmail.com", "braciabien@gmail.com"]
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.email || !allowed.includes(session.user.email))
    return NextResponse.json("Unauthorized", { status: 401 })

  const url = `https://api.vercel.com/v1/edge-config/${process.env.EDGE_CONFIG_ID}/items`
  const apiKey = process.env.VERCEL_API_TOKEN
  const data: z.infer<typeof edgeConfigSchema> = await req.json()

  if (!url) return NextResponse.json("no config url", { status: 401 })
  if (!apiKey) return NextResponse.json("no api key", { status: 401 })
  if (!edgeConfigSchema.safeParse(data).success)
    return NextResponse.json(
      { message: "invalid data", data: data },
      { status: 401 },
    )
  try {
    const items: {
      operation: "update"
      key: string
      value: string[]
    }[] = []

    if (data.mainImgKeys?.length)
      items.push({
        operation: "update",
        key: "mainImgKeys",
        value: data.mainImgKeys.filter((e) => Boolean(e)),
      })

    if (data.currentImgKeys?.length)
      items.push({
        operation: "update",
        key: "currentImgKeys",
        value: data.currentImgKeys.filter((e) => Boolean(e)),
      })

    const updateEdgeConfig = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: items,
      }),
    })

    const result = await updateEdgeConfig.json()
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(error)
  }
}
