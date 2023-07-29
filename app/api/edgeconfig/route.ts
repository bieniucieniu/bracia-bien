import authOptions from "@/lib/auth"
import { edgeConfigType } from "@/lib/edgeconfig"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const allowed = ["bienmikolaj@gmail.com", "braciabien@gmail.com"]
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.email || !allowed.includes(session.user.email))
    return NextResponse.json("Unauthorized", { status: 401 })

  const url = process.env.EDGE_CONFIG
  const apiKey = process.env.VERCEL_API_TOKEN
  const data: edgeConfigType & any = await req.json()

  if (!url) return NextResponse.json("no config url", { status: 401 })
  if (!apiKey) return NextResponse.json("no api key", { status: 401 })
  if (data.currentImgKeys && !Array.isArray(data.currentImgKeys))
    NextResponse.json(
      { message: "invalid current data", data: data.currentImgKeys },
      { status: 401 },
    )
  if (data.mainImgKeys && !Array.isArray(data.mainImgKeys))
    NextResponse.json(
      { message: "invalid main data", data: data.mainImgKeys },
      { status: 401 },
    )

  try {
    const filteredData: edgeConfigType = {
      mainImgKeys: data.mainImgKeys,
      currentImgKeys: data.currentImgKeys,
    }
    const updateEdgeConfig = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filteredData),
    })
    const result = await updateEdgeConfig.json()
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(error)
  }
}
