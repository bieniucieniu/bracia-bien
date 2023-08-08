import { pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core"

const categoryEnum = pgEnum("category", ["current", "main", ""])

export const images = pgTable("images", {
	key: uuid("id").primaryKey().unique(),
	category: categoryEnum("category").default(""),
	alt: varchar("alt").default(""),
})
