import {
  pgEnum,
  pgTable,
  serial,
  text,
  unique,
  varchar,
} from "drizzle-orm/pg-core"

export const infoCardCategorieEnum = pgEnum("info_card_categorie", [
  "main",
  "current",
])

export const infoCard = pgTable(
  "info_card",
  {
    id: serial("id").notNull().primaryKey(),
    categorie: infoCardCategorieEnum("categorie").default("current").notNull(),
    title: varchar("title").notNull(),
    description: text("description"),
    content: text("content").notNull(),
    link: varchar("link"),
    imageKey: varchar("image_key"),
  },
  (table) => {
    return {
      infoCardUnique: unique("info_card_id_unique").on(table.id),
    }
  },
)
