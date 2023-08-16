import { pgTable, serial, text, unique, varchar } from "drizzle-orm/pg-core"
import { imagesData } from "./image"

export const infoCard = pgTable(
  "infoCard",
  {
    id: serial("id").primaryKey().notNull(),
    title: varchar("title").notNull(),
    content: text("alt").default("").notNull(),
    link: varchar("link"),
    imageKey: varchar("image_key")
      .references(() => imagesData.key)

      .array(),
  },
  (table) => {
    return {
      infoCardUnique: unique("info_card_id_unique").on(table.id),
    }
  },
)
