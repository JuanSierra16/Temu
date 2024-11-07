import { test } from '@playwright/test';

test('Links de descargar APP', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Descargar en App Store' }).click();
    const page1 = await page1Promise;
    const page2Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Descargar en Google Play' }).click();
    const page2 = await page2Promise;
});
