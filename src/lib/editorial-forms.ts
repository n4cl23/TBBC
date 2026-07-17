import { z } from 'zod';
import { publicationStatus } from './cms-schemas';

export const editorialReviewSchema = z
  .object({
    entity: z.string().min(1),
    id: z.string().min(1),
    decision: z.enum(['submit', 'approve', 'requestChanges']),
    note: z.string().trim().min(3).max(1_000),
  })
  .strict();

export const mediaUploadSchema = z.object({
  scope: z.string().trim().min(1).max(120),
  alt: z.string().trim().min(3).max(240),
  caption: z.string().trim().max(500).optional(),
  category: z.string().trim().min(1).max(80),
  entityId: z.string().trim().min(1).optional(),
});

export const typedEditorialRecordSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/).max(160),
  title: z.string().trim().min(1).max(180),
  summary: z.string().trim().max(2_000).optional(),
  status: publicationStatus,
});

export type TypedEditorialRecord = z.infer<typeof typedEditorialRecordSchema>;
