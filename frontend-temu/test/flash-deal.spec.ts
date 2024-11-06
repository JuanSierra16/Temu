import { test, expect } from '@playwright/test';

test('Banner ofertas', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page
        .getByRole('heading', { name: '⚡ Ofertas relámpago ⚡' })
        .click();
    await expect(page.getByText('Por tiempo limitado')).toBeVisible();
    await expect(
        page.getByRole('heading', { name: '⚡ Ofertas relámpago ⚡' }),
    ).toBeVisible();
    await page.getByText('Por tiempo limitado').click();
    await page
        .getByRole('heading', { name: '⚡ Ofertas relámpago ⚡' })
        .click();
    await page
        .getByRole('heading', { name: '⚡ Ofertas relámpago ⚡' })
        .click();
});

test('Slider ofertas', async ({ page }, testInfo) => {
    await page.route('http://localhost:3000/products', async route => {
        console.log('Mock axios login request');

        await route.fulfill({
            status: 200,
            body: JSON.stringify([
                {
                    id: 1,
                    descripcion: 'Protector de colchón ',
                    precio_con_descuento: 85.481,
                    precio: 122.229,
                    imagenes: ['1pc Protector de colchón imper.webp'],
                },
                {
                    descripcion: '2 set Gorro De Satén',
                    precio_con_descuento: 4.757,
                    precio: 28.629,
                    imagenes: ['2 Unids_set Gorro De Satén De .webp'],
                },
            ]),
        });
    });

    await page.route('http://localhost:3000/products/2', async route => {
        await route.fulfill({
            status: 200,
            body: JSON.stringify({
                descripcion: '2 set Gorro De Satén',
                precio_con_descuento: 4.757,
                precio: 28.629,
                imagenes: ['2 Unids_set Gorro De Satén De .webp'],
            }),
        });
    });

    await page.goto('http://localhost:5173/');

    await testInfo.attach('Ofertas 0', {
        body: await page.screenshot(),
        contentType: 'image/png',
    });

    await expect(
        page.getByRole('link', { name: '2 set Gorro De Satén' }),
    ).toBeVisible();

    const item = page.getByRole('link', { name: '2 set Gorro De Satén' });

    await testInfo.attach('Ofertas', {
        body: await item.screenshot(),
        contentType: 'image/png',
    });
});
