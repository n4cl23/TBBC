import {expect,test} from '@playwright/test';

const character='/personagens/the-last-dragon-slayer';

for(const width of [360,390,768,1024,1311,1440,1920])test(`integridade tipográfica do personagem em ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});
 await page.goto(character);
 await page.waitForLoadState('networkidle');
 const result=await page.evaluate(()=>{
  const viewport=document.documentElement.clientWidth;
  const headings=[...document.querySelectorAll<HTMLElement>('.codex-heading h2')].map(element=>({left:element.getBoundingClientRect().left,right:element.getBoundingClientRect().right,top:element.getBoundingClientRect().top,bottom:element.getBoundingClientRect().bottom}));
  return {overflow:document.documentElement.scrollWidth>viewport,headingsOutside:headings.some(heading=>heading.left<0||heading.right>viewport+1),headingsOverlap:headings.some((a,index)=>headings.some((b,other)=>index<other&&a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top)),count:headings.length};
 });
 expect(result.count).toBeGreaterThanOrEqual(7);
 expect(result.overflow).toBeFalsy();
 expect(result.headingsOutside).toBeFalsy();
 expect(result.headingsOverlap).toBeFalsy();
});
