import {NextResponse} from 'next/server';import {graphService} from '@/lib/semantic-graph';
export async function GET(_:Request,{params}:{params:Promise<{id:string}>}){const {id}=await params,entity=graphService.getEntity(id);return entity?NextResponse.json({entity,relations:graphService.relations(id)}):NextResponse.json({message:'Entidade não encontrada.'},{status:404});}
