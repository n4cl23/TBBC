import {NextResponse} from 'next/server';import {graphService} from '@/lib/semantic-graph';
export function GET(){return NextResponse.json(graphService.getGraph());}
