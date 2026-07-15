import {expect,test} from '@playwright/test';
test.describe('semantic knowledge graph',()=>{
 test('publishes graph and answers canonical queries',async({request})=>{const graph=await (await request.get('/api/graph')).json();expect(graph.stats.loops).toBe(0);expect(graph.nodes.length).toBeGreaterThan(100);const frost=await (await request.get('/api/world?query=protects&subject=frost-kingdom')).json();expect(frost.data.map((entity:{slug:string})=>entity.slug)).toContain('vhaldris')});
 test('searches aliases and serves entity context',async({request})=>{const search=await (await request.get('/api/search?q=abyss')).json();expect(search.data[0].entity.slug).toBe('kingdom-of-the-abyss');const related=await (await request.get('/api/entity/vhaldris/related')).json();expect(related.related.length).toBeGreaterThan(0)});
});
