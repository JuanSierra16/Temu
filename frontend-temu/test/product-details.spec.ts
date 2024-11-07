import { test, expect } from '@playwright/test';

test('Detalles de producto', async ({ page }) => {
    await page.route('http://localhost:3000/products', async route => {
        await route.fulfill({
            status: 200,
            body: JSON.stringify([
                {
                    id: 1,
                    descripcion: 'producto 1',
                    precio_con_descuento: 85.48,
                    precio: 122.22,
                    imagenes: ['imagen_prueba.webp'],
                },
            ]),
        });
    });

    await page.goto('http://localhost:5173/');

    await expect(page.getByText('producto 1')).toBeVisible();
    await expect(page.getByText('$85.48')).toBeVisible();
    await expect(
        page.locator('small').filter({ hasText: '$122.22' }),
    ).toBeVisible();

    expect(page.getByAltText('producto 1')).toBeVisible();
});
