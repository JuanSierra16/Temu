import { test, expect } from '@playwright/test';

test('Se muestra Información empresarial', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(
        page.getByRole('heading', { name: 'Información de la empresa' }),
    ).toBeVisible();
    await expect(
        page.getByRole('link', { name: 'Acerca de Temu' }),
    ).toBeVisible();
    await expect(
        page.getByRole('link', { name: 'Afililado e influencer: gana' }),
    ).toBeVisible();
    await expect(
        page.getByRole('link', { name: 'Política de devolución y' }),
    ).toBeVisible();
    await expect(
        page.getByRole('link', { name: 'Política de devolución y' }),
    ).toBeVisible();
    await expect(
        page.getByRole('link', { name: 'Reportar actividad sospechosa' }),
    ).toBeVisible();
    await expect(
        page.locator('div').filter({ hasText: /^Certificación de seguridad$/ }),
    ).toBeVisible();
    await expect(
        page.locator('div').filter({ hasText: /^Aceptamos$/ }),
    ).toBeVisible();
});

test('Links de redes sociales', async ({ page }, testInfo) => {
    await page.goto('http://localhost:5173/');

    await page.getByRole('heading', { name: 'Conectar con Temu' }).click();

    await expect(
        page.getByRole('heading', { name: 'Conectar con Temu' }),
    ).toBeVisible();

    const page1Promise = page.waitForEvent('popup');
    await page.locator('.footer-links-social > a').first().click();
    const page1 = await page1Promise;

    const page2Promise = page.waitForEvent('popup');
    await page.locator('.footer-links-social > a:nth-child(2)').first().click();
    const page2 = await page2Promise;

    const page3Promise = page.waitForEvent('popup');
    await page.locator('.footer-links-social > a:nth-child(3)').first().click();
    const page3 = await page3Promise;

    const page4Promise = page.waitForEvent('popup');
    await page
        .locator('.footer-links-container > div:nth-child(3) > a')
        .first()
        .click();
    const page4 = await page4Promise;
    const page5Promise = page.waitForEvent('popup');
    await page
        .locator('.footer-links-container > div:nth-child(3) > a:nth-child(2)')
        .click();

    const page5 = await page5Promise;
    const page6Promise = page.waitForEvent('popup');
    await page
        .locator('.footer-links-container > div:nth-child(3) > a:nth-child(3)')
        .click();
    const page6 = await page6Promise;
});
