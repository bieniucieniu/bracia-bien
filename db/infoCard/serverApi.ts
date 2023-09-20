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
export const cardsId = selectCardSchema.pick({ id: true })

export async function updateInfoCards(
  data: {
    ids: z.infer<typeof cardsId>[]
    update: Partial<z.infer<typeof cardOmitId>>
  }[],
): Promise<ValidationError | { res: any }> {
  const res = await Promise.allSettled(
    data.map(async ({ update, ids }) => {
      try {
        cardsId.array().parse(ids)
        cardOmitId.parse(update)

        if (!ids.length) throw new Error("empty id Array")

        const r = await db
          .update(infoCard)
          .set(update)
          .where(inArray(infoCard, ids))

        return r
      } catch (e) {
        return {
          error: e,
          ids,
          data,
          status: 400,
        }
      }
    }),
  )

  return { res }
}

export async function deleteInfoCards(
  ids: z.infer<typeof cardsId>[],
): Promise<ValidationError | { res: any }> {
  try {
    cardsId.array().parse(ids)
    if (!ids.length) throw new Error("empty ids array")
    const res = await db
      .delete(infoCard)
      .where(inArray(infoCard, ids))
      .returning()

    return { res }
  } catch (e) {
    return {
      error: e,
      status: 400,
    }
  }
}
