import { test, expect } from '@playwright/test';

test('Input de búsqueda', async ({ page }, testInfo) => {
    await page.goto('http://localhost:5173/');
    await expect(
        page.getByPlaceholder('Buscar', { exact: true }),
    ).toBeVisible();
    await expect(
        page.getByRole('navigation').getByRole('button'),
    ).toBeVisible();

    await testInfo.attach('navbar', {
        body: await page.screenshot(),
        contentType: 'image/png',
    });
});

test('Input de búsqueda responsive', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('http://localhost:5173/');

    await testInfo.attach('navbar', {
        body: await page.screenshot(),
        contentType: 'image/png',
    });

    await expect(
        page.getByPlaceholder('Buscar...', { exact: true }),
    ).toBeVisible();
});

test('Recien llegados', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1400, height: 667 });

    await page.goto('http://localhost:5173/');

    await testInfo.attach('navbar', {
        body: await page.screenshot(),
        contentType: 'image/png',
    });

    await expect(
        page.getByText('Recién llegados', { exact: true }),
    ).toBeVisible();
});

test('Recién llegados no debe mostrarse', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('http://localhost:5173/');

    await testInfo.attach('navbar', {
        body: await page.screenshot(),
        contentType: 'image/png',
    });

    await expect(
        page.getByText('Recién llegados', { exact: true }),
    ).not.toBeVisible();
});
