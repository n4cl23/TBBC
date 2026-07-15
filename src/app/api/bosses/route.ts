import {NextResponse} from 'next/server';
import {canonEntities, officialBossEncounters} from '@/data/canon-registry';
export function GET(){
  const data=officialBossEncounters.map((encounter)=>({...encounter,subject:canonEntities.find((entity)=>entity.kind===encounter.subjectKind&&entity.slug===encounter.subjectSlug)??null}));
  return NextResponse.json({data,count:data.length,source:'/api/canon'});
}
