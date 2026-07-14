import {expect,test} from '@playwright/test';

test.describe('identidade visual cinematográfica',()=>{
 const scenarios=[
  {name:'home-360',route:'/pt-br',width:360,height:800},
  {name:'personagens-390',route:'/pt-br/personagens',width:390,height:844},
  {name:'colecoes-768',route:'/pt-br/colecoes',width:768,height:1024},
  {name:'reinos-1024',route:'/pt-br/reinos',width:1024,height:900},
  {name:'home-1440',route:'/pt-br',width:1440,height:900},
  {name:'guardioes-1920',route:'/pt-br/guardioes',width:1920,height:1080},
 ];
 for(const scenario of scenarios)test(scenario.name,async({page})=>{
  await page.setViewportSize({width:scenario.width,height:scenario.height});
  await page.goto(scenario.route);
  await page.evaluate(()=>document.fonts.ready);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth)).toBe(true);
  await expect(page).toHaveScreenshot(`${scenario.name}.png`,{fullPage:false,animations:'disabled',caret:'initial',maxDiffPixelRatio:.015});
 });
});
