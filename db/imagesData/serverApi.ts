import { drizzle } from "drizzle-orm/vercel-postgres"
import { sql } from "@vercel/postgres"
import { InferInsertModel, eq, inArray } from "drizzle-orm"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { productsData, prodCategorieEnum } from "../schema/imagesData"
import { z } from "zod"
import { utapi } from "uploadthing/server"

export const db = drizzle(sql)
export const insertProdSchema = createInsertSchema(productsData, {
  imgsKey: z.string().array(),
})
export const selectProdSchema = createSelectSchema(productsData, {
  imgsKey: z.string().array(),
})

export const categorieSchema = z.enum(prodCategorieEnum.enumValues)

type ValidationError = { error: any; status?: number; [key: string]: any }

export async function getProdByCategorie(
  categorie: z.infer<typeof categorieSchema>,
): Promise<ValidationError | { res: any }> {
  try {
    categorieSchema.array().parse(categorie)

    const res = await db
      .select()
      .from(productsData)
      .where(eq(productsData.categorie, categorie))
    return { res }
  } catch (e) {
    return {
      message: "error in get by categorie images",
      error: e,
      status: 400,
    }
  }
}

export async function getAllProdData() {
  try {
    const res = await db.select().from(productsData)
    return res
  } catch (e) {
    return {
      massage: "error in get all images",
      error: e,
      status: 400,
    }
  }
}

export async function populateProdDataWithImgLinks(
  data: Awaited<ReturnType<typeof getAllProdData>>,
) {
  try {
    if (!(data instanceof Array)) return []

    const imgsUrls =
      data.length > 0
        ? await utapi.getFileUrls(data.map((k) => k.imgsKey).flat() as string[])
        : []

    const products: (InferInsertModel<typeof productsData> & {
      imgs?: typeof imgsUrls
    })[] =
      data && data.length
        ? data.map((e) => {
            return {
              imgs: e.imgsKey
                ?.map((k) => imgsUrls.find((u) => k === u.key))
                .filter((data) => data) as typeof imgsUrls,
              ...e,
            }
          })
        : []

    return products
  } catch (e) {
    const r = [] as [] & { error?: any }
    r.error = e
    return r
  }
}

export async function addProdData(
  data: z.infer<typeof insertProdSchema>[],
): Promise<ValidationError | { res: any }> {
  try {
    insertProdSchema.array().parse(data)

    const res = await db.insert(productsData).values(data).returning()
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

export const imagesOmitKey = insertProdSchema.omit({ imgsKey: true })

export async function updateImagesData(
  update: {
    ids: number[]
    change: Partial<z.infer<typeof imagesOmitKey>>
  }[],
): Promise<ValidationError | { res: any }> {
  try {
    const res = await Promise.allSettled(
      update.map(async ({ change, ids }) => {
        imagesOmitKey.parse(change)
        z.number().int().parse(ids)

        const r = await db
          .update(productsData)
          .set(change)
          .where(inArray(productsData.id, ids))
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

export async function deleteProdData(
  ids: number[],
): Promise<ValidationError | { res: any; utRes: { success: boolean } }> {
  try {
    z.number().int().parse(ids)
    if (!ids.length) throw new Error("empty keys array deleteImages")
    const res = await db
      .delete(productsData)
      .where(inArray(productsData.id, ids))
      .returning()

    const utRes = await utapi.deleteFiles(res.map((e) => e.imgsKey).flat())

    return { res, utRes }
  } catch (e) {
    return {
      message: "error in delete images",
      error: e,
      status: 400,
    }
  }
}
