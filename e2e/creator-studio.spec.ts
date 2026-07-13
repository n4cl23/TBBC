import {expect, test} from '@playwright/test';

test.describe('Creator Studio', () => {
  test('conecta o pipeline aos módulos do World Engine', async ({page}) => {
    await page.goto('/admin/creator-studio');
    await expect(page.getByRole('heading', {name:'Creator Studio', level:1})).toBeVisible();
    await expect(page.getByRole('heading', {name:'Da ideia à publicação'})).toBeVisible();
    await expect(page.getByRole('button', {name:'Ideia'})).toBeVisible();
    await page.getByRole('button', {name:'STL', exact:true}).click();
    await expect(page.getByRole('heading', {name:'STL Center'})).toBeVisible();
    await expect(page.getByRole('link', {name:/Abrir módulo/})).toHaveAttribute('href','/admin/stl');
  });

  test('permite localizar e trocar o personagem ativo', async ({page}) => {
    await page.goto('/admin/creator-studio');
    await page.getByPlaceholder('Buscar personagem').fill('Skywind');
    await page.getByRole('button', {name:/Skywind/}).click();
    await expect(page.getByRole('heading', {name:'Skywind', level:1})).toBeVisible();
  });
});
