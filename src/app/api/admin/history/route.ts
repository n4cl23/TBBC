import {NextResponse} from 'next/server';import {listAudit} from '@/lib/cms-repository';export async function GET(){return NextResponse.json(await listAudit())}
