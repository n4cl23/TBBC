import {describe,expect,it} from 'vitest';import {GET} from './route';
describe('/api/graph',()=>{it('returns an integral semantic graph',async()=>{const body=await GET().json();expect(body.nodes.length).toBeGreaterThan(100);expect(body.edges.length).toBeGreaterThan(100);expect(body.stats.loops).toBe(0)})});
