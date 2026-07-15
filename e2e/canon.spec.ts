import {expect,test} from '@playwright/test';

test.describe('canon consolidation',()=>{
  test('publishes the official taxonomy and causal timeline',async({request})=>{
    const response=await request.get('/api/canon');
    expect(response.ok()).toBeTruthy();
    const canon=await response.json();
    expect(canon.version).toBe('1.0.0');
    expect(canon.realms).toHaveLength(6);
    expect(canon.events.map((event:{slug:string})=>event.slug)).toContain('covenant-of-guardians');
    expect(canon.taxonomy.rules.boss).toContain('Papel de encontro');
  });

  test('resolves legacy names to a canonical slug',async({request})=>{
    const response=await request.get('/api/canon?kind=realm&alias=abyss');
    expect(response.ok()).toBeTruthy();
    await expect(response.json()).resolves.toMatchObject({canonicalSlug:'kingdom-of-the-abyss'});
  });
});
