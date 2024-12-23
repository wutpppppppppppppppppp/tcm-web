import { index, json, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// This file defines the structure of your database tables using the Drizzle ORM.

// To modify the database schema:
// 1. Update this file with your desired changes.
// 2. Generate a new migration by running: `npm run db:generate`

// The generated migration file will reflect your schema changes.
// The migration is automatically applied during the next database interaction,
// so there's no need to run it manually or restart the Next.js server.

export type LocaleLang = {
  th: string;
  en: string;
};

export type LocaleLangMeta = {
  th: string[];
  en: string[];
};

export const productSchema = pgTable('product', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: json().$type<LocaleLang>().notNull(),
  short_description: json().$type<LocaleLang>().notNull(),
  full_description: json().$type<LocaleLang>().notNull(),
  image: text('image'),
  meta_keywords: json().$type<LocaleLangMeta>().notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
}, (t) => {
  return [
    index('slug_idx').on(t.slug),
    index('name_idx').on(t.name),
  ];
});
