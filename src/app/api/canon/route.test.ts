import {describe,expect,it} from 'vitest';
import {NextRequest} from 'next/server';
import {GET} from './route';
describe('/api/canon',()=>{
  it('returns the consolidated canon',async()=>{const response=GET(new NextRequest('http://localhost/api/canon')),body=await response.json();expect(body.version).toBe('1.1.0');expect(body.entities.filter((x:{kind:string})=>x.kind==='realm')).toHaveLength(6);expect(body.graph.edges.length).toBeGreaterThan(0)});
  it('resolves a legacy alias',async()=>{const response=GET(new NextRequest('http://localhost/api/canon?kind=realm&alias=abyss'));await expect(response.json()).resolves.toMatchObject({slug:'kingdom-of-the-abyss'})});
});
