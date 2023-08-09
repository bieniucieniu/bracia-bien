import { addImages, deleteImages, updateImages } from "@/db/postgres"
import { getAuth } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
	const session = await getAuth()
	if (!session)
		return NextResponse.json({ error: "Unauthorized" }, { status: 403 })

	const data = await req.json()
	if (data.images) {
		const added = await addImages(data.images)
		return NextResponse.json({ added })
	}

	NextResponse.json({ message: "no data provaided" })
}
export async function PATCH(req: Request) {
	const session = await getAuth()
	if (!session)
		return NextResponse.json({ error: "Unauthorized" }, { status: 403 })

	const data = await req.json()

	const res: { deleted?: any; updated?: any } = {}

	if (data.updateImages) {
		const updated = await updateImages(data.update)
		res.updated = updated
	}

	if (data.deleteImages) {
		const deleted = await deleteImages(data.delete)
		res.deleted = deleted
	}

	if (res.deleted && res.updated) {
		return NextResponse.json({ massage: "no data provaided" })
	}

	return NextResponse.json(res)
}
