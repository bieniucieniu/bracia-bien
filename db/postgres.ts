import { drizzle } from "drizzle-orm/vercel-postgres"
import { sql } from "@vercel/postgres"
import { eq, inArray } from "drizzle-orm"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { images } from "./schema"
import type { z } from "zod"
import { NextResponse } from "next/server"

export const db = drizzle(sql)

export const insertImagesSchema = createInsertSchema(images)
export const selectImagesSchema = createSelectSchema(images)

export async function getImages(category: "current" | "main" | "" = "") {
	const selectResult = await db
		.select()
		.from(images)
		.where(eq(images.category, category))

	return selectResult
}

export async function addImages(data: z.infer<typeof insertImagesSchema>[]) {
	if (!insertImagesSchema.safeParse(data))
		return NextResponse.json({ error: "invalid data" }, { status: 400 })

	const res = await db.insert(images).values(data)

	return NextResponse.json(res)
}

export async function updateImages({
	keys,
	update,
}: {
	keys: string[]
	update: {
		alt?: string
		category?: z.infer<typeof insertImagesSchema>["category"]
	}
}) {
	if (!insertImagesSchema.omit({ key: true }).safeParse(update))
		return NextResponse.json({ error: "invalid data" }, { status: 400 })

	const res = await db
		.update(images)
		.set(update)
		.where(inArray(images.key, keys))

	return NextResponse.json(res)
}
