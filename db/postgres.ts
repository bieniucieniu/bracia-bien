import { drizzle } from "drizzle-orm/vercel-postgres"
import { sql } from "@vercel/postgres"
import { inArray } from "drizzle-orm"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { images, categorieEnum } from "./schema"
import { z } from "zod"
import { type NextResponse } from "next/server"

type JsonRes = Parameters<(typeof NextResponse)["json"]>

export const db = drizzle(sql)

export const insertImagesSchema = createInsertSchema(images)
export const selectImagesSchema = createSelectSchema(images)

export const uuidArraySchema = z.string().uuid().array()
export const categorieSchema = z.enum(categorieEnum.enumValues)

export async function getByCategorie(
  categorie: z.infer<typeof categorieSchema>[],
): Promise<JsonRes> {
  if (!categorieSchema.array().safeParse(categorieSchema))
    return [{ error: "invalid data" }, { status: 400 }]

  const res = await db
    .select()
    .from(images)
    .where(inArray(images.categorie, categorie))

  return [res]
}

export async function addImages(
  data: z.infer<typeof insertImagesSchema>[],
): Promise<JsonRes> {
  if (!insertImagesSchema.safeParse(data))
    return [{ error: "invalid data" }, { status: 400 }]

  const res = await db.insert(images).values(data).returning()

  return [res]
}

export const imagesOmitKey = selectImagesSchema.omit({ key: true })

export async function updateImages(
  data: {
    keys: z.infer<typeof uuidArraySchema>
    update: z.infer<typeof imagesOmitKey>
  }[],
): Promise<JsonRes> {
  const res = await Promise.all(
    data.map(async ({ update, keys }) => {
      if (!imagesOmitKey.safeParse(update) || !uuidArraySchema.safeParse(keys))
        return [{ error: "invalid data", update, keys }, { status: 400 }]

      const r = await db
        .update(images)
        .set(update)
        .where(inArray(images.key, keys))
        .returning()

      return r
    }),
  )

  return [{ res }]
}

export async function deleteImages(
  keys: z.infer<typeof uuidArraySchema>,
): Promise<JsonRes> {
  if (!uuidArraySchema.safeParse(keys))
    return [{ error: "invalid data" }, { status: 400 }]

  const res = await db.delete(images).where(inArray(images.key, keys))

  return [res]
}
