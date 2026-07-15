import {z} from 'zod';
export const publicationStatus=z.enum(['draft','published','archived']);
export const cmsMutationSchema=z.object({slug:z.string().regex(/^[a-z0-9-]+$/).max(160),data:z.record(z.string(),z.unknown()),status:publicationStatus,expectedVersion:z.number().int().positive().optional()}).strict();
export const cmsPatchSchema=z.union([cmsMutationSchema,z.object({action:z.literal('duplicate')}).strict(),z.object({action:z.literal('restore'),versionId:z.string().min(1),reason:z.string().min(3).max(500)}).strict()]);
