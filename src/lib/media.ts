import type {MediaImage} from '@/types/media';
export const CHARACTER_PLACEHOLDER='/images/placeholders/character-placeholder.svg';
export function mediaSrc(image:string|MediaImage|undefined,variant:'thumbnail'|'card'|'full'='full'){if(!image)return CHARACTER_PLACEHOLDER;if(typeof image==='string')return image;return image.variants?.[variant]||image.src}
export function mediaAlt(image:string|MediaImage|undefined,fallback:string){return typeof image==='object'&&image.alt?image.alt:fallback}
export const ACCEPTED_MIME=['image/png','image/jpeg','image/webp'];
export const MAX_IMAGE_SIZE=10*1024*1024;
export function validateImageInput(file:{size:number;type:string;name:string}){if(!file.size)return 'O arquivo está vazio.';if(file.size>MAX_IMAGE_SIZE)return 'A imagem excede o limite de 10 MB.';if(!ACCEPTED_MIME.includes(file.type))return 'Formato não suportado. Envie PNG, JPG ou WEBP.';if(!/\.(png|jpe?g|webp)$/i.test(file.name))return 'A extensão do arquivo não é válida.';return null}
