import { pgEnum, pgTable, varchar } from "drizzle-orm/pg-core"

export const categorieEnum = pgEnum("category", ["current", "main", "else"])

export const images = pgTable("images", {
  key: varchar("key").primaryKey().unique(),
  categorie: categorieEnum("categorie").default("else"),
  alt: varchar("alt").default(""),
})
