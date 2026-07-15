import {NextRequest,NextResponse} from 'next/server';import {graphService} from '@/lib/semantic-graph';
export function GET(request:NextRequest){const id=request.nextUrl.searchParams.get('entity');const data=id?graphService.relations(id):graphService.getGraph().edges;return NextResponse.json({data,count:data.length,source:'/api/canon'});}
