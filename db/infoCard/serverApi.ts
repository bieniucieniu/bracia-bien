import { drizzle } from "drizzle-orm/vercel-postgres"
import { sql } from "@vercel/postgres"
import { inArray } from "drizzle-orm"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { infoCard } from "../schema/infoCard"

export const db = drizzle(sql)
export const insertCardSchema = createInsertSchema(infoCard)
export const selectCardSchema = createSelectSchema(infoCard)

export const uuidArraySchema = z.string().uuid().array()

type ValidationError = {
  error: any
  status?: number
  [key: string]: any
}

export async function getAllInfoCards() {
  try {
    const res = await db.select().from(infoCard)
    return res
  } catch (e) {
    return {
      error: e,
      status: 400,
    }
  }
}

export async function addInfoCards(
  data: z.infer<typeof insertCardSchema>[],
): Promise<ValidationError | { res: any }> {
  try {
    insertCardSchema.array().parse(data)

    const res = await db.insert(infoCard).values(data).returning()

    return { res }
  } catch (e) {
    return {
      error: e,
      status: 400,
      data,
    }
  }
}

export const cardOmitId = selectCardSchema.omit({ id: true })
export const cardsId = z.number().array()

export async function updateInfoCards(
  data: {
    ids: number[]
    update: Partial<z.infer<typeof cardOmitId>>
  }[],
): Promise<ValidationError | any> {
  try {
    const res = await Promise.allSettled(
      data.map(async ({ update, ids }) => {
        cardOmitId.parse(update)

        if (!ids.length) throw new Error("empty id Array")

        const r = await db
          .update(infoCard)
          .set(update)
          .where(inArray(infoCard.id, ids))

        return r
      }),
    )

    console.log("json: ", res)
    return res
  } catch (e) {
    return {
      error: e,
      data,
      status: 400,
    }
  }
}

export async function deleteInfoCards(
  ids: number[],
): Promise<ValidationError | any> {
  try {
    cardsId.parse(ids)
    if (!ids.length) throw new Error("empty ids array")
    const res = await db
      .delete(infoCard)
      .where(inArray(infoCard.id, ids))
      .returning()

    return res
  } catch (e) {
    return {
      error: e,
      status: 400,
    }
  }
}
