import { drizzle } from "drizzle-orm/vercel-postgres"
import { sql } from "@vercel/postgres"
import { inArray } from "drizzle-orm"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { imagesData, categorie as categorieEnum } from "./schema"
import { z } from "zod"
import { utapi } from "uploadthing/server"

export const db = drizzle(sql)
export const insertImagesSchema = createInsertSchema(imagesData)
export const selectImagesSchema = createSelectSchema(imagesData)

export const uuidArraySchema = z.string().uuid().array()
export const categorieSchema = z.enum(categorieEnum.enumValues)

type ValidationError = {
  error: [{ error: string; [key: string]: any }, { status: number }]
}

export async function getByCategorie(
  categorie: z.infer<typeof categorieSchema>[],
): Promise<ValidationError | { res: typeof res; error?: never }> {
  if (!categorieSchema.array().safeParse(categorie))
    return { error: [{ error: "invalid data", categorie }, { status: 400 }] }
  const res = await db
    .select()
    .from(imagesData)
    .where(inArray(imagesData.categorie, categorie))

  return { res }
}

export async function getAll() {
  const res = await db.select().from(imagesData)
  return { res }
}

export async function addImages(
  data: z.infer<typeof insertImagesSchema>[],
): Promise<ValidationError | { res: typeof res; error?: never }> {
  if (!insertImagesSchema.safeParse(data))
    return { error: [{ error: "invalid data", data }, { status: 400 }] }

  const res = await db.insert(imagesData).values(data).returning()

  return { res }
}

export const imagesOmitKey = selectImagesSchema.omit({ key: true })

export async function updateImages(
  data: {
    keys: z.infer<typeof uuidArraySchema>
    update: z.infer<typeof imagesOmitKey>
  }[],
): Promise<ValidationError | { res: typeof res; error?: never }> {
  const res = await Promise.all(
    data.map(async ({ update, keys }) => {
      if (!imagesOmitKey.safeParse(update) || !uuidArraySchema.safeParse(keys))
        return {
          error: [{ error: "invalid data", keys, update }, { status: 400 }],
        }

      const r = await db
        .update(imagesData)
        .set(update)
        .where(inArray(imagesData.key, keys))
      return r
    }),
  )

  return { res }
}

export async function deleteImages(
  keys: z.infer<typeof uuidArraySchema>,
): Promise<
  ValidationError | { res: typeof res; utRes: typeof utRes; error?: never }
> {
  if (!uuidArraySchema.safeParse(keys))
    return { error: [{ error: "invalid data", keys }, { status: 400 }] }
  const res = await db
    .delete(imagesData)
    .where(inArray(imagesData.key, keys))
    .returning()

  const utRes = await utapi.deleteFiles(res.map((e) => e.key))

  return { res, utRes }
}