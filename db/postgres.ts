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
): Promise<ValidationError | { res: any; error?: never }> {
  try {
    if (!categorieSchema.array().safeParse(categorie))
      return { error: [{ error: "invalid data", categorie }, { status: 400 }] }
    const res = await db
      .select()
      .from(imagesData)
      .where(inArray(imagesData.categorie, categorie))
    return { res }
  } catch (e) {
    return {
      error: [{ error: "error", info: e }, { status: 400 }],
    }
  }
}

export async function getAll() {
  try {
    const res = await db.select().from(imagesData)
    return { res }
  } catch (e) {
    return {
      error: [{ error: "error", info: e }, { status: 400 }],
    }
  }
}

export async function addImages(
  data: z.infer<typeof insertImagesSchema>[],
): Promise<ValidationError | { res: any; error?: never }> {
  try {
    if (!insertImagesSchema.safeParse(data))
      return { error: [{ error: "invalid data", data }, { status: 400 }] }

    const res = await db.insert(imagesData).values(data).returning()

    return { res }
  } catch (e) {
    return {
      error: [{ error: "error", info: e }, { status: 400 }],
    }
  }
}

export const imagesOmitKey = selectImagesSchema.omit({ key: true })

export async function updateImages(
  data: {
    keys: z.infer<typeof uuidArraySchema>
    update: Partial<z.infer<typeof imagesOmitKey>>
  }[],
): Promise<ValidationError | { res: any; error?: never }> {
  try {
    const res = await Promise.allSettled(
      data.map(async ({ update, keys }) => {
        if (
          !imagesOmitKey.safeParse(update) ||
          !uuidArraySchema.safeParse(keys)
        )
          return {
            error: [
              { error: "invalid update data", keys, update },
              { status: 400 },
            ],
          }

        const r = await db
          .update(imagesData)
          .set(update)
          .where(inArray(imagesData.key, keys))
        return r
      }),
    )

    return { res }
  } catch (e) {
    return {
      error: [{ error: "error", info: e }, { status: 400 }],
    }
  }
}

export async function deleteImages(
  keys: z.infer<typeof uuidArraySchema>,
): Promise<
  ValidationError | { res: any; utRes: { success: boolean }; error?: never }
> {
  try {
    if (!uuidArraySchema.safeParse(keys) || !keys.length)
      return {
        error: [{ error: "invalid delete data", keys }, { status: 400 }],
      }
    const res = await db
      .delete(imagesData)
      .where(inArray(imagesData.key, keys))
      .returning()

    const utRes = await utapi.deleteFiles(res.map((e) => e.key))

    return { res, utRes }
  } catch (e) {
    return {
      error: [{ error: "error", info: e }, { status: 400 }],
    }
  }
}
