import { z } from 'zod';

const LocalizedStringSchema = z.object({
  th: z.string().min(1, 'Thai translation required'),
  en: z.string().min(1, 'English translation required'),
});

const LocalizedKeywordsSchema = z.object({
  th: z.array(z.string()).min(1, 'At least one Thai keyword required'),
  en: z.array(z.string()).min(1, 'At least one English keyword required'),
});

export const ProductValidation = z.object({
  id: z.number().positive().optional(),
  name: LocalizedStringSchema,
  short_description: LocalizedStringSchema,
  full_description: LocalizedStringSchema,
  updatedAt: z.date().optional(),
  image: z.string().url('Must be a valid URL').nullable().optional(),
  meta_keywords: LocalizedKeywordsSchema,
  createdAt: z.date().optional(),
  slug: z.string().min(1, 'Slug is required'),
  category: LocalizedStringSchema,
});
