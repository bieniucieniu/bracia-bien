import { drizzle } from "drizzle-orm/libsql"
import { createClient } from "@libsql/client"
import { z } from "zod"
import {
  categories,
  insertCategoriesSchema,
  insertProductsSchema,
  products,
} from "./schema/products"
import { eq, inArray } from "drizzle-orm"

const client = createClient({
  url: process.env.DATABASE_URL as string,
  authToken: process.env.DATABASE_TOKEN as string,
})

export const db = drizzle(client)

export async function insertCategorie(name: string, imgUrl?: string) {
  const data = {
    name,
    image: imgUrl,
  }
  try {
    insertCategoriesSchema.parse(data)

    return await db.insert(categories).values(data).returning().get()
  } catch (e) {
    console.log(e)
    return e as Error
  }
}

const intSchema = z.number().int()

export async function deleteCategrie(id: number) {
  try {
    intSchema.parse(id)
    return await db
      .delete(categories)
      .where(eq(categories.id, id))
      .returning()
      .get()
  } catch (e) {
    console.log(e)
    return e as Error
  }
}

export async function insertProduct(
  name: string,
  description: string,
  categoryId: number,
  imgUrl: string,
) {
  const data = { name, description, categoryId, image: imgUrl }

  try {
    insertProductsSchema.parse(data)
    return await db.insert(products).values(data).returning().get()
  } catch (e) {
    console.log(e)
    return e as Error
  }
}

export async function deleteProduct(ids: number[]) {
  try {
    intSchema.array().parse(ids)

    return await db
      .delete(products)
      .where(inArray(products.id, ids))
      .returning()
      .get()
  } catch (e) {
    console.log(e)
    return e as Error
  }
}

export async function getProduct(id: number) {
  try {
    const p = await db.select().from(products).where(eq(products.id, id)).get()

    if (p == undefined) throw new Error("no such product")

    return p
  } catch (e) {
    console.log(e)
    return e as Error
  }
}

export async function getAllProducts(limit?: number) {
  try {
    return await db
      .select()
      .from(products)
      .limit(limit ?? 100)
      .get()
  } catch (e) {
    console.log(e)
    return e as Error
  }
}

export async function getProductsFromCategorie(categorieId: number) {
  try {
    const cat = await db
      .select()
      .from(categories)
      .where(eq(categories.id, categorieId))
      .get()

    if (cat != undefined) throw new Error("no such category")

    return await db
      .select()
      .from(products)
      .where(eq(products.categoryId, categorieId))
  } catch (e) {
    console.log(e)
    return e as Error
  }
}
