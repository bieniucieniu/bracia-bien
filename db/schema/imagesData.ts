import { pgTable, pgEnum, unique, varchar } from "drizzle-orm/pg-core"

export const imagesCategorieEnum = pgEnum("images_categorie", [
  "gallery",
  "main",
  "current",
  "else",
])

export const imagesData = pgTable(
  "images_data",
  {
    key: varchar("key").primaryKey().notNull(),
    categorie: imagesCategorieEnum("categorie").default("gallery").notNull(),
    alt: varchar("alt").default("").notNull(),
  },
  (table) => {
    return {
      imagesKeyUnique: unique("images_key_unique").on(table.key),
    }
  },
)
