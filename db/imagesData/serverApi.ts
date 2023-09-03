import { drizzle } from "drizzle-orm/vercel-postgres"
import { sql } from "@vercel/postgres"
import { eq, inArray } from "drizzle-orm"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { imagesData, imagesCategorieEnum } from "../schema/imagesData"
import { z } from "zod"
import { utapi } from "uploadthing/server"

export const db = drizzle(sql)
export const insertImagesSchema = createInsertSchema(imagesData)
export const selectImagesSchema = createSelectSchema(imagesData)

export const uuidArraySchema = z.string().array()
export const categorieSchema = z.enum(imagesCategorieEnum.enumValues)

type ValidationError = { error: any; status?: number; [key: string]: any }

export async function getImagesDataByCategorie(
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
      message: "error in get by categorie images",
      error: e,
      status: 400,
    }
  }
}

export async function getAllImagesData() {
  try {
    const res = await db.select().from(imagesData)
    return { res }
  } catch (e) {
    return {
      massage: "error in get all images",
      error: e,
      status: 400,
    }
  }
}

export async function addImagesData(
  data: z.infer<typeof insertImagesSchema>[],
): Promise<ValidationError | { res: any }> {
  try {
    insertImagesSchema.array().parse(data)

    const res = await db.insert(imagesData).values(data).returning()
    console.log(res)

    return { res }
  } catch (e) {
    return {
      message: "invalid data add images",
      error: e,
      data,
      status: 400,
    }
  }
}

export const imagesOmitKey = selectImagesSchema.omit({ key: true })

export async function updateImagesData(
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
      message: "error in undate images",
      error: e,
      status: 400,
    }
  }
}

export async function deleteImagesData(
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
      message: "error in delete images",
      error: e,
      status: 400,
    }
  }
}
