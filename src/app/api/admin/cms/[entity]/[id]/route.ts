import {NextRequest,NextResponse} from 'next/server';
import {CMS_ENTITIES,type CmsEntityType} from '@/types/cms';
import {deleteCmsRecord,duplicateCmsRecord,getCmsRecord,listVersions,restoreVersion,saveCmsRecord} from '@/lib/cms-repository';
import {requestContext,validateAdminMutation} from '@/lib/admin-security';
import {validateCanonPayload} from '@/lib/canon-validation';

function valid(value:string):value is CmsEntityType{return (CMS_ENTITIES as readonly string[]).includes(value)}

export async function GET(_:NextRequest,{params}:{params:Promise<{entity:string;id:string}>}){
  const {entity,id}=await params;
  if(!valid(entity))return NextResponse.json({message:'Entidade inválida.'},{status:404});
  const record=await getCmsRecord(entity,id);
  return record?NextResponse.json({record,versions:await listVersions(entity,id)}):NextResponse.json({message:'Não encontrado.'},{status:404});
}

export async function PATCH(request:NextRequest,{params}:{params:Promise<{entity:string;id:string}>}){
  const {entity,id}=await params,error=validateAdminMutation(request);
  if(error)return NextResponse.json({message:error},{status:429});
  if(!valid(entity))return NextResponse.json({message:'Entidade inválida.'},{status:404});
  try{
    const body=await request.json() as {slug?:string;data?:Record<string,unknown>;status?:'draft'|'published'|'archived';action?:'duplicate'|'restore';versionId?:string},context=requestContext(request);
    if(body.action==='duplicate')return NextResponse.json({message:'Conteúdo duplicado.',record:await duplicateCmsRecord(entity,id,context)});
    if(body.action==='restore'&&body.versionId)return NextResponse.json({message:'Versão restaurada.',record:await restoreVersion(entity,id,body.versionId,context)});
    if(!body.slug||!body.data||!body.status)return NextResponse.json({message:'Slug, conteúdo e status são obrigatórios.'},{status:400});
    const validation=validateCanonPayload(entity,body.data);
    if(!validation.ok)return NextResponse.json({message:validation.message},{status:400});
    const record=await saveCmsRecord(entity,{id,slug:body.slug,data:body.data,status:body.status},context);
    return NextResponse.json({message:'Conteúdo salvo com sucesso.',record});
  }catch(error){return NextResponse.json({message:error instanceof Error?error.message:'Falha ao salvar.'},{status:400})}
}

export async function DELETE(request:NextRequest,{params}:{params:Promise<{entity:string;id:string}>}){
  const {entity,id}=await params,error=validateAdminMutation(request);
  if(error)return NextResponse.json({message:error},{status:429});
  if(!valid(entity))return NextResponse.json({message:'Entidade inválida.'},{status:404});
  try{await deleteCmsRecord(entity,id,requestContext(request));return NextResponse.json({message:'Conteúdo removido.'})}
  catch(error){return NextResponse.json({message:error instanceof Error?error.message:'Falha ao remover.'},{status:400})}
}
