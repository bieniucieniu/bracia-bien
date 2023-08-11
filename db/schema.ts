import { pgEnum, pgTable, varchar } from "drizzle-orm/pg-core"

export const categorieEnum = pgEnum("category", ["current", "main", ""])

export const images = pgTable("images", {
  key: varchar("key").primaryKey().unique(),
  categorie: categorieEnum("categorie").default(""),
  alt: varchar("alt").default(""),
})
