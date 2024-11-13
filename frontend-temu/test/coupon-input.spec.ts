import { test, expect } from '@playwright/test';

test('Input de cupón de compra', async ({ page }) => {
    await page.goto('http://localhost:5173/checkout');

    await page
        .locator(
            'div:nth-child(5) > .modal-container > .modal-close > .modal-close-icon > path',
        )
        .click();

    await page.getByPlaceholder('Ingresa el código del cupón').click();

    await expect(
        page.getByPlaceholder('Ingresa el código del cupón'),
    ).toBeVisible();
});
