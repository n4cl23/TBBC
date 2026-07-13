import {expect,test} from '@playwright/test';
test.describe('identidade visual cinematográfica',()=>{
 for(const scenario of [{name:'home-desktop',route:'/',width:1440,height:900},{name:'personagens-mobile',route:'/personagens',width:390,height:844},{name:'reinos-desktop',route:'/reinos',width:1440,height:900}])test(scenario.name,async({page})=>{await page.setViewportSize({width:scenario.width,height:scenario.height});await page.goto(scenario.route);await page.evaluate(()=>document.fonts.ready);await expect(page).toHaveScreenshot(`${scenario.name}.png`,{fullPage:false,animations:'disabled',maxDiffPixelRatio:.015})});
});
