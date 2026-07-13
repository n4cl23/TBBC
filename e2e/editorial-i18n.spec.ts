import {expect,test} from '@playwright/test';
test.describe('resoluÃ§Ã£o editorial localizada',()=>{
  for(const [locale,path] of [['pt-br','colecoes'],['en','collections'],['es','colecciones']] as const){
    test(`coleÃ§Ã£o resolve integralmente em ${locale}`,async({page})=>{await page.goto(`/${locale}/${path}/black-banner-company`);const root=page.locator('.collection-book');await expect(root).toHaveAttribute('data-requested-locale',locale);await expect(root).toHaveAttribute('data-resolved-locale',locale==='pt-br'?'pt-br':'pt-br');await expect(root).toHaveAttribute('data-used-fallback',locale==='pt-br'?'false':'true');await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href',new RegExp(`/${locale}/${path}/black-banner-company$`))});
  }
  test('troca de idioma mantÃ©m a entidade e nÃ£o duplica locale',async({page})=>{await page.goto('/es/colecciones/black-banner-company');await page.getByLabel('Idioma').selectOption('en');await expect(page).toHaveURL(/\/en\/collections\/black-banner-company$/);await expect(page).not.toHaveURL(/\/en\/en\//)});
  test('personagem e relaÃ§Ãµes recebem o locale solicitado',async({page})=>{await page.goto('/es/personajes/black-fang-mercenary');await expect(page.locator('.character-book')).toHaveAttribute('data-requested-locale','es');await expect(page.locator('.character-book')).toHaveAttribute('data-used-fallback','true')});
});
