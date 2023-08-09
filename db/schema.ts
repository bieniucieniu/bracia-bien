import { pgEnum, pgTable, varchar } from "drizzle-orm/pg-core"

export const categoryEnum = pgEnum("category", ["current", "main", ""])

export const images = pgTable("images", {
  key: varchar("id").primaryKey().unique(),
  category: categoryEnum("category").default(""),
  alt: varchar("alt").default(""),
})
