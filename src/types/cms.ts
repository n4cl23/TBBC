export const CMS_ENTITIES=['characters','collections','guardians','realms','crowns','weapons','creatures','timeline','locations','artifacts','factions','buildings','battles','printProfiles','mediaAssets','prompts','roadmap','gallery','news','artBible','printGuide','stlAssets','marketplaces','marketplaceListings','marketplacePrices'] as const;
export type CmsEntityType=typeof CMS_ENTITIES[number];
export type PublicationStatus='draft'|'published'|'archived';
export type CmsRecord={id:string;entity:CmsEntityType;slug:string;data:Record<string,unknown>;status:PublicationStatus;version:number;createdAt:string;updatedAt:string;publishedAt?:string};
export type CmsVersion={id:string;recordId:string;entity:CmsEntityType;version:number;data:Record<string,unknown>;status:PublicationStatus;createdAt:string;actor:string};
export type AuditEntry={id:string;timestamp:string;actor:string;ip:string;entity:CmsEntityType;recordId:string;operation:'create'|'update'|'delete'|'publish'|'restore'|'duplicate';changes:Array<{field:string;before:unknown;after:unknown}>};
export type CmsDatabase={records:CmsRecord[];versions:CmsVersion[];audit:AuditEntry[]};
export type WorldRelation={id:string;fromType:CmsEntityType;fromSlug:string;toType:CmsEntityType;toSlug:string;kind:'ally'|'enemy'|'guardian'|'realm'|'weapon'|'collection'|'timeline'|'media'|'prompt'|'download'|'related';label:string;bidirectional:boolean};
