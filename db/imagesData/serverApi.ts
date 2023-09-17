import { drizzle } from "drizzle-orm/vercel-postgres"
import { sql } from "@vercel/postgres"
import { InferInsertModel, eq, inArray } from "drizzle-orm"
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

export async function populateImagesDataWithLinks(
  data: Awaited<ReturnType<typeof getAllImagesData>>,
) {
  try {
    const allImages = data.res
    if (!allImages) return []

    const imgsUrls =
      allImages.length > 0
        ? await utapi.getFileUrls(allImages.map((k) => k.key))
        : []

    const imgsData: (InferInsertModel<typeof imagesData> & {
      url?: string
    })[] =
      allImages && allImages.length
        ? allImages
            .map((e) => {
              return {
                url: imgsUrls.find((u) => e.key === u.key)?.url,
                ...e,
              }
            })
            .filter((e) => typeof e.url === "string")
        : []

    return imgsData
  } catch (e) {
    const r = [] as [] & { error?: any }
    r.error = e
    return r
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

export const imagesOmitKey = insertImagesSchema.omit({ key: true })

export async function updateImagesData(
  update: {
    keys: z.infer<typeof uuidArraySchema>
    change: Partial<z.infer<typeof imagesOmitKey>>
  }[],
): Promise<ValidationError | { res: any }> {
  try {
    const res = await Promise.allSettled(
      update.map(async ({ change, keys }) => {
        imagesOmitKey.parse(change)
        uuidArraySchema.parse(keys)

        const r = await db
          .update(imagesData)
          .set(change)
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
  data: z.infer<typeof uuidArraySchema>,
): Promise<ValidationError | { res: any; utRes: { success: boolean } }> {
  try {
    uuidArraySchema.parse(data)
    if (!data.length) throw new Error("empty keys array deleteImages")
    const res = await db
      .delete(imagesData)
      .where(inArray(imagesData.key, data))
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
