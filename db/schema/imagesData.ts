import { pgTable, pgEnum, varchar, text, integer } from "drizzle-orm/pg-core"

export const prodCategorieEnum = pgEnum("product_categorie", [
  "Pajamas",
  "briefs",
  "socks",
  "gloves",
  "tights",
  "tops",
  "else",
])

export const genderEnum = pgEnum("gender", ["male", "female", "unisex"])

export const productsData = pgTable("products_data", {
  id: integer("id").primaryKey(),
  categorie: prodCategorieEnum("categorie").default("else").notNull(),
  name: varchar("name").default("").notNull(),
  description: text("description"),
  imgsKey: varchar("imgsKey").array().notNull(),
  link: text("link"),
})
