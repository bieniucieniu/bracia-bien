import { drizzle } from "drizzle-orm/vercel-postgres"
import { sql } from "@vercel/postgres"
import { eq, inArray } from "drizzle-orm"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { imagesData, imagesCategorieEnum } from "./schema/image"
import { z } from "zod"
import { utapi } from "uploadthing/server"

export const db = drizzle(sql)
export const insertImagesSchema = createInsertSchema(imagesData)
export const selectImagesSchema = createSelectSchema(imagesData)

export const uuidArraySchema = z.string().uuid().array()
export const categorieSchema = z.enum(imagesCategorieEnum.enumValues)

type ValidationError = { error: any; status?: number; [key: string]: any }

export async function getImagesByCategorie(
  categorie: z.infer<typeof categorieSchema>,
): Promise<ValidationError | { res: any }> {
  try {
    categorieSchema.array().parse(categorie)

    const res = await db
      .select()
      .from(imagesData)
      .where(eq(imagesData.categorie, categorie))
    return { res }
  } catch (e) {
    return {
      error: e,
      status: 400,
    }
  }
}

export async function getAllImages() {
  try {
    const res = await db.select().from(imagesData)
    return { res }
  } catch (e) {
    return {
      error: e,
      status: 400,
    }
  }
}

export async function addImages(
  data: z.infer<typeof insertImagesSchema>[],
): Promise<ValidationError | { res: any }> {
  try {
    insertImagesSchema.parse(data)

    const res = await db.insert(imagesData).values(data).returning()

    return { res }
  } catch (e) {
    return {
      error: e,
      status: 400,
    }
  }
}

export const imagesOmitKey = selectImagesSchema.omit({ key: true })

export async function updateImages(
  data: {
    keys: z.infer<typeof uuidArraySchema>
    update: Partial<z.infer<typeof imagesOmitKey>>
  }[],
): Promise<ValidationError | { res: any }> {
  try {
    const res = await Promise.allSettled(
      data.map(async ({ update, keys }) => {
        imagesOmitKey.parse(update)
        uuidArraySchema.parse(keys)

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
      error: e,
      status: 400,
    }
  }
}

export async function deleteImages(
  keys: z.infer<typeof uuidArraySchema>,
): Promise<ValidationError | { res: any; utRes: { success: boolean } }> {
  try {
    uuidArraySchema.parse(keys)
    if (!keys.length) throw new Error("empty keys array deleteImages")
    const res = await db
      .delete(imagesData)
      .where(inArray(imagesData.key, keys))
      .returning()

    const utRes = await utapi.deleteFiles(res.map((e) => e.key))

    return { res, utRes }
  } catch (e) {
    return {
      error: e,
      status: 400,
    }
  }
}
