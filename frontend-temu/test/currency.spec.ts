import { test, expect } from '@playwright/test';

test('Cambio de moneda y vista de producto', async ({ page }, testInfo) => {
    await page.route('http://localhost:3000/products', async route => {
        await route.fulfill({
            status: 200,
            body: JSON.stringify([
                {
                    id: 1,
                    descripcion: 'producto 1',
                    precio_con_descuento: 14.46,
                    precio: 57.7,
                    imagenes: ['imagen_prueba.webp'],
                },
            ]),
        });
    });

    await page.route(
        'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json',
        async route => {
            await route.fulfill({
                status: 200,
                body: JSON.stringify({
                    date: '2024-11-10',
                    eur: {
                        cop: 4671.64025022,
                    },
                }),
            });
        },
    );

    await page.goto('http://localhost:5173/');

    await expect(
        page.locator('p').filter({ hasText: /^€14\.46$/ }),
    ).toBeVisible();
    await expect(
        page.locator('p').filter({ hasText: /^€57\.70$/ }),
    ).toBeVisible();

    await testInfo.attach('Currency', {
        body: await page.getByRole('link', { name: 'producto 1' }).screenshot(),
        contentType: 'image/png',
    });

    await page.getByText('ES', { exact: true }).click();
    await page.getByRole('button', { name: 'Cambiar país/región' }).click();
    await page.getByRole('combobox').selectOption('COP');

    await testInfo.attach('Currency 2', {
        body: await page.screenshot(),
        contentType: 'image/png',
    });

    await page.getByRole('link', { name: 'logo' }).click();

    await testInfo.attach('Currency 3', {
        body: await page.getByRole('link', { name: 'producto 1' }).screenshot(),
        contentType: 'image/png',
    });

    await expect(page.getByRole('main')).toContainText('COP 67,551.92');
    await expect(page.getByRole('main')).toContainText('COP 269,553.64');
});
