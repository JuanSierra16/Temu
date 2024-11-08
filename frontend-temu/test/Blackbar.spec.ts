import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByText('Envío gratis en cada pedidoOferta exclusiva').click();
  await expect(page.getByRole('heading', { name: 'Envío gratis' })).toBeVisible();
  await page.getByRole('button', { name: 'Ok' }).click();
});