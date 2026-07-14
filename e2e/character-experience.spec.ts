import { expect, test } from '@playwright/test';

test('personagem abre como experiência editorial', async ({ page }) => {
  await page.goto('/personagens/black-fang-mercenary');
  await expect(page.locator('.character-codex')).toBeVisible();
  await expect(page.locator('.codex-hero h1')).toHaveText(
    'Black Fang Mercenary',
  );
  await expect(page.locator('.codex-hero blockquote')).toBeVisible();
  await page.evaluate(() => document.querySelector('#story')?.scrollIntoView());
  await expect(page.getByRole('heading', { name: 'Origem' })).toBeVisible();
  await expect(page.locator('.codex-relations')).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Da ideia ao artefato' }),
  ).toBeVisible();
  await expect(page.getByText('Prompt oficial')).toBeVisible();
  await expect(page.locator('.codex-miniature-layout')).toBeVisible();
  await expect(page.locator('.codex-timeline article')).toHaveCount(4);
  await expect(
    page.locator('.codex-relations a[href*="/personagens/"]'),
  ).toHaveCount(2);
});

test('dossiê acompanha o idioma sem fallback editorial', async ({ page }) => {
  await page.goto('/en/characters/fenrir');
  await expect(page.locator('.character-codex')).toHaveAttribute(
    'data-used-fallback',
    'false',
  );
  await expect(page.getByRole('heading', { name: 'Origin' })).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'From idea to artifact' }),
  ).toBeVisible();
  await expect(page.getByText('Preserved rumors')).toBeVisible();
});

for (const width of [390, 768, 1440])
  test(`códice responsivo em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/personagens/black-fang-mercenary');
    const rhythm = await page.evaluate(() => {
      const title = document
        .querySelector('.codex-hero h1')
        ?.getBoundingClientRect();
      const hero = document
        .querySelector('.codex-hero')
        ?.getBoundingClientRect();
      return {
        overflow:
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth,
        heroHeight: hero?.height || 0,
        titleOutside:
          !title ||
          title.left < 0 ||
          title.right > document.documentElement.clientWidth + 1,
      };
    });
    expect(rhythm.overflow).toBeFalsy();
    expect(rhythm.titleOutside).toBeFalsy();
    expect(rhythm.heroHeight).toBeLessThanOrEqual(820);
  });
