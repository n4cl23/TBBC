import {NextRequest,NextResponse} from 'next/server';
import {CMS_ENTITIES,type CmsEntityType} from '@/types/cms';
import {listCmsRecords,saveCmsRecord} from '@/lib/cms-repository';
import {requestContext,validateAdminMutation} from '@/lib/admin-security';
import {validateCanonPayload} from '@/lib/canon-validation';

function valid(value:string):value is CmsEntityType{return (CMS_ENTITIES as readonly string[]).includes(value)}

export async function GET(_:NextRequest,{params}:{params:Promise<{entity:string}>}){
  const {entity}=await params;
  if(!valid(entity))return NextResponse.json({message:'Entidade inválida.'},{status:404});
  return NextResponse.json(await listCmsRecords(entity));
}

export async function POST(request:NextRequest,{params}:{params:Promise<{entity:string}>}){
  const {entity}=await params,error=validateAdminMutation(request);
  if(error)return NextResponse.json({message:error},{status:429});
  if(!valid(entity))return NextResponse.json({message:'Entidade inválida.'},{status:404});
  try{
    const body=await request.json() as {slug:string;data:Record<string,unknown>;status:'draft'|'published'|'archived'};
    if(!body.slug?.match(/^[a-z0-9-]+$/))return NextResponse.json({message:'Slug inválido.'},{status:400});
    const validation=validateCanonPayload(entity,body.data);
    if(!validation.ok)return NextResponse.json({message:validation.message},{status:400});
    const record=await saveCmsRecord(entity,body,requestContext(request));
    return NextResponse.json({message:'Conteúdo criado com sucesso.',record});
  }catch{return NextResponse.json({message:'Não foi possível criar o conteúdo.'},{status:400})}
}
