import { expect, test } from '@playwright/test';

test('creature atlas filters and opens an honest localized record', async ({ page }) => {
  await page.goto('/pt-br/atlas/creatures');
  await expect(page.getByRole('heading', { level: 1, name: 'Criaturas de Asterheim' })).toBeVisible();
  await expect(page.getByText('34 criaturas encontradas')).toBeVisible();
  const cardImages = await page.locator('.creature-card-art img').evaluateAll((images) => images.slice(0, 2).map((image) => image.getAttribute('src')));
  expect(cardImages[0]).not.toBe(cardImages[1]);
  await page.getByLabel('Reino').selectOption('stormreach');
  await expect(page.getByText('6 criaturas encontradas')).toBeVisible();
  await page.getByPlaceholder('Buscar criatura').fill('serpent');
  await expect(page.getByText('1 criaturas encontradas')).toBeVisible();
  await page.getByRole('link', { name: 'Abrir registro' }).click();
  await expect(page).toHaveURL(/\/pt-br\/atlas\/creatures\/lightning-serpent/);
  await expect(page.getByRole('heading', { level: 1, name: 'Lightning Serpent' })).toBeVisible();
  await expect(page.getByText('Origem e registro', { exact: true })).toBeVisible();
  await expect(page.getByText('Modelo 3D em preparação')).toBeVisible();
  await expect(page.getByText('Prompt oficial')).toHaveCount(0);
  await expect(page.locator('.creature-gallery figure')).toHaveCount(1);
  await expect(page.locator('.creature-related a')).toHaveCount(4);
  await expect(page.locator('.creature-habitat-map a').first()).toHaveAttribute('href', /\/pt-br\/atlas\/stormreach\//);
  await expect(page.getByRole('button', { name: 'Carregar modelo 3D' })).toHaveCount(0);
});

test('creature routes follow the selected language', async ({ page }) => {
  await page.goto('/en/atlas/creatures/kraken');
  await expect(page.getByText('Origin and record', { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: /Back to creatures/ })).toHaveAttribute('href', '/en/atlas/creatures');
  await page.goto('/es/atlas/creatures/kraken');
  await expect(page.getByText('Origen y registro', { exact: true })).toBeVisible();
});

for (const width of [360, 390, 768, 1024, 1440, 1920]) test(`creature atlas remains usable at ${width}px`, async ({ page }) => { await page.setViewportSize({ width, height: 900 }); await page.goto('/pt-br/atlas/creatures'); await expect(page.getByRole('heading', { level: 1 })).toBeVisible(); await expect(page.getByLabel('Filtros do Atlas')).toBeVisible(); expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true); });
