import { test, expect } from '@playwright/test';

test('Búsqueda avanzada', async ({ page }, testInfo) => {
    await page.route('http://localhost:3000/products', async route => {
        await route.fulfill({
            status: 200,
            body: JSON.stringify([
                {
                    id: 1,
                    descripcion: 'Base de maquillaje con crema',
                    precio_con_descuento: 85.481,
                    precio: 122.229,
                    imagenes: ['imagen_prueba.webp'],
                },
                {
                    descripcion: 'Juguetes de baño',
                    precio_con_descuento: 4.757,
                    precio: 28.629,
                    imagenes: ['imagen_prueba.webp'],
                },
            ]),
        });
    });

    await page.goto('http://localhost:5173/');

    await expect(
        page.getByPlaceholder('Buscar', { exact: true }),
    ).toBeVisible();

    await page.getByPlaceholder('Buscar', { exact: true }).click();
    await page.getByPlaceholder('Buscar', { exact: true }).fill('base');

    await testInfo.attach('Product', {
        body: await page.screenshot(),
        contentType: 'image/png',
    });

    await page.getByRole('navigation').getByRole('button').click();

    const url = page.url();
    expect(url).toBe('http://localhost:5173/search-product/base');

    const product = page.getByText('Base de maquillaje con crema');
    await expect(product).toBeVisible();

    await testInfo.attach('Product search', {
        body: await page.screenshot(),
        contentType: 'image/png',
    });
});
