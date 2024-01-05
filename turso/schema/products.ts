import { relations, sql } from "drizzle-orm"
import { z } from "zod"
import {
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core"

export const categories = sqliteTable(
  "categories",
  {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    image: text("image"),
  },
  (categories) => ({
    nameIdx: index("name_idx").on(categories.name),
  }),
)

export const insertCategoriesSchema = z.object({
  name: z.string(),
  image: z.string().url(),
})

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}))

export const products = sqliteTable(
  "products",
  {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id),
    image: text("image"),
    createdAt: integer("created_at").default(sql`(cast (unixepoch () as int))`),
  },
  (products) => ({
    idIdx: uniqueIndex("id_idx").on(products.id),
    categoryIdIdx: index("category_id_idx").on(products.categoryId),
  }),
)

export const insertProductsSchema = z.object({
  name: z.string(),
  description: z.string(),
  categoryId: z.number().int(),
  image: z.string().url(),
})
