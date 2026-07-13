import {expect,test} from '@playwright/test';
test.describe('localized editorial resolution',()=>{
  for(const [locale,path] of [['pt-br','colecoes'],['en','collections'],['es','colecciones']] as const){
    test(`collection resolves completely in ${locale}`,async({page})=>{await page.goto(`/${locale}/${path}/black-banner-company`);const root=page.locator('.collection-book');await expect(root).toHaveAttribute('data-requested-locale',locale);await expect(root).toHaveAttribute('data-resolved-locale',locale);await expect(root).toHaveAttribute('data-used-fallback','false');await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href',new RegExp(`/${locale}/${path}/black-banner-company$`))});
  }
  test('language switch preserves entity without duplicating locale',async({page})=>{await page.goto('/es/colecciones/black-banner-company');await page.getByLabel('Idioma').selectOption('en');await expect(page).toHaveURL(/\/en\/collections\/black-banner-company$/);await expect(page).not.toHaveURL(/\/en\/en\//)});
  test('character and relations receive the requested locale',async({page})=>{await page.goto('/es/personajes/black-fang-mercenary');const root=page.locator('.character-book');await expect(root).toHaveAttribute('data-requested-locale','es');await expect(root).toHaveAttribute('data-resolved-locale','es');await expect(root).toHaveAttribute('data-used-fallback','false')});
});
