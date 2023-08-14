import { pgTable, pgEnum, unique, varchar } from "drizzle-orm/pg-core"

export const categorie = pgEnum("categorie", ["else", "main", "current"])

export const imagesData = pgTable(
  "imagesData",
  {
    key: varchar("key").primaryKey().notNull(),
    categorie: categorie("categorie").default("else"),
    alt: varchar("alt").default(""),
  },
  (table) => {
    return {
      imagesKeyUnique: unique("images_key_unique").on(table.key),
    }
  },
)
