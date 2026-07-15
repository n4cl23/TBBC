import type { CmsEntityType, CmsRecord, CmsVersion, PublicationStatus } from '@/types/cms';
import type { CharacterMediaRecord } from '@/types/media';

export type MutationContext = {
  actor: string;
  ip: string;
  requestId: string;
  origin?: string;
  reason?: string;
};

export interface CanonRepository {
  verify(version: string): Promise<{ entities: number; relations: number }>;
  snapshot(version: string): Promise<unknown>;
}

export interface EntityRepository {
  list(type: CmsEntityType): Promise<CmsRecord[]>;
  get(type: CmsEntityType, id: string): Promise<CmsRecord | undefined>;
  save(type: CmsEntityType, input: { id?: string; slug: string; data: Record<string, unknown>; status: PublicationStatus; expectedVersion?: number }, context: MutationContext): Promise<CmsRecord>;
  archive(type: CmsEntityType, id: string, context: MutationContext): Promise<void>;
}

export type RelationRepository = EntityRepository;
export type TimelineRepository = EntityRepository;

export interface MediaRepository {
  getCharacter(slug: string): Promise<CharacterMediaRecord>;
  saveCharacter(slug: string, record: CharacterMediaRecord, context: MutationContext): Promise<CharacterMediaRecord>;
}

export interface AuditRepository {
  list(limit?: number): Promise<unknown[]>;
}

export interface EditorialVersionRepository {
  list(type: CmsEntityType, id: string): Promise<CmsVersion[]>;
  restore(type: CmsEntityType, id: string, versionId: string, context: MutationContext): Promise<CmsRecord>;
}
