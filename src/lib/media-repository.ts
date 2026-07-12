import 'server-only';import {readFile,writeFile,mkdir} from 'node:fs/promises';import path from 'node:path';import type {CharacterMediaRecord,MediaDatabase,MediaImage} from '@/types/media';
const dbPath=path.join(process.cwd(),'src','data','media.json');
async function readDb():Promise<MediaDatabase>{try{return JSON.parse(await readFile(dbPath,'utf8')) as MediaDatabase}catch{return {characters:{}}}}
async function writeDb(db:MediaDatabase){await mkdir(path.dirname(dbPath),{recursive:true});await writeFile(dbPath,JSON.stringify(db,null,2),'utf8')}
export async function getCharacterMedia(slug:string):Promise<CharacterMediaRecord>{const db=await readDb();return db.characters[slug]||{gallery:[]}}
export async function listCharacterMedia(){return (await readDb()).characters}
export async function saveCharacterMedia(slug:string,record:CharacterMediaRecord){const db=await readDb();db.characters[slug]=record;await writeDb(db);return record}
export async function updateImageMetadata(slug:string,id:string,patch:Pick<MediaImage,'alt'|'caption'|'isPrimary'|'order'>){const record=await getCharacterMedia(slug);const all=[...(record.primary?[record.primary]:[]),...record.gallery];const target=all.find(x=>x.id===id);if(!target)throw new Error('Imagem não encontrada.');Object.assign(target,patch,{updatedAt:new Date().toISOString()});if(patch.isPrimary){if(record.primary)record.primary.isPrimary=false;record.gallery=all.filter(x=>x.id!==id);target.isPrimary=true;record.primary=target}record.gallery.sort((a,b)=>a.order-b.order);return saveCharacterMedia(slug,record)}
