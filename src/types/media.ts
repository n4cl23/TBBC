export type MediaVariant = 'thumbnail' | 'card' | 'full';
export type MediaImage = { id:string; src:string; filename:string; alt:string; caption?:string; width?:number; height?:number; mimeType?:string; size?:number; order:number; isPrimary:boolean; createdAt?:string; updatedAt?:string; variants?:Partial<Record<MediaVariant,string>> };
export type CharacterMediaRecord = { primary?:MediaImage; gallery:MediaImage[] };
export type MediaDatabase = { characters:Record<string,CharacterMediaRecord> };
