import {
  pgTable,
  pgEnum,
  unique,
  varchar,
  serial,
  text,
} from "drizzle-orm/pg-core"

export const imagesCategorieEnum = pgEnum("images_categorie", [
  "gallery",
  "main",
  "current",
  "info",
])

export const imagesData = pgTable(
  "imagesData",
  {
    key: varchar("key").primaryKey().notNull(),
    categorie: imagesCategorieEnum("categorie").default("gallery"),
    alt: varchar("alt").default(""),
  },
  (table) => {
    return {
      imagesKeyUnique: unique("images_key_unique").on(table.key),
    }
  },
)

export const infoCard = pgTable(
  "infoCard",
  {
    id: serial("id").primaryKey().notNull(),
    title: varchar("title"),
    content: text("alt").default(""),
    link: varchar("link"),
    imageKey: varchar("image_key").references(() => imagesData.key),
  },
  (table) => {
    return {
      infoCardUnique: unique("info_card_id_unique").on(table.id),
    }
  },
)
