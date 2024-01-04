import { relations, sql } from "drizzle-orm"
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
    id: text("id").primaryKey(),
    name: text("name"),
    image: text("image"),
  },
  (categories) => ({
    nameIdx: index("name_idx").on(categories.name),
  }),
)

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
    updatedAt: integer("updated_at").default(sql`(cast (unixepoch () as int))`),
  },
  (products) => ({
    idIdx: uniqueIndex("id_idx").on(products.id),
    categoryIdIdx: index("category_id_idx").on(products.categoryId),
  }),
)
