import {expect,test} from '@playwright/test';

test('personagem abre como experiência editorial',async({page})=>{
 await page.goto('/personagens/black-fang-mercenary');
 await expect(page.locator('.character-codex')).toBeVisible();
 await expect(page.locator('.codex-hero h1')).toHaveText('Black Fang Mercenary');
 await expect(page.locator('.codex-hero blockquote')).toBeVisible();
 await page.evaluate(()=>document.querySelector('#story')?.scrollIntoView());
 await expect(page.getByRole('heading',{name:'Origem'})).toBeVisible();
 await expect(page.locator('.codex-relations')).toBeVisible();
});

for(const width of [390,768,1440])test(`códice responsivo em ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});
 await page.goto('/personagens/black-fang-mercenary');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth)).toBeFalsy();
});
