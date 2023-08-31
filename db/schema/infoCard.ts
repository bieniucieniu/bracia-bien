import { pgTable, serial, text, unique, varchar } from "drizzle-orm/pg-core"
import { imagesData } from "./image"

export const infoCard = pgTable(
  "info_card",
  {
    id: serial("id").primaryKey(),
    title: varchar("title").default("title"),
    content: text("alt").default("content"),
    link: varchar("link"),
    imageKey: varchar("image_key"),
  },
  (table) => {
    return {
      infoCardUnique: unique("info_card_id_unique").on(table.id),
    }
  },
)
