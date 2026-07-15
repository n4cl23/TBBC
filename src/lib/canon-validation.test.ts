import {describe,expect,it} from 'vitest';
import {validateCanonPayload} from './canon-validation';
describe('canon payload validation',()=>{
  it('accepts canonical event realms',()=>expect(validateCanonPayload('events',{title:'Evento',summary:'Resumo',realms:['ironhold']})).toEqual({ok:true}));
  it('rejects unknown realms',()=>expect(validateCanonPayload('events',{title:'Evento',summary:'Resumo',realms:['unknown']})).toMatchObject({ok:false}));
  it('separates boss role from entity kind',()=>expect(validateCanonPayload('bossEncounters',{role:'boss',subjectKind:'creature'})).toEqual({ok:true}));
});
