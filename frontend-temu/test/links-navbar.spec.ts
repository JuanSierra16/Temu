import { test, expect } from '@playwright/test';

test('Accesos directos menu', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByText('Categorías').click();
    await page.getByRole('navigation').getByText('Automotriz').click();
    await page.getByRole('navigation').getByText('Motocicletas').click();
    const page1Promise = page.waitForEvent('popup');
    await page
        .getByRole('link', { name: 'Centro de ayuda', exact: true })
        .click();
    const page1 = await page1Promise;
    await expect(page1.locator('h1')).toContainText(
        'Hola, ¿cómo podemos ayudarte?',
    );
    const page2Promise = page1.waitForEvent('popup');
    await page1.getByRole('link', { name: 'Política de privacidad y' }).click();
    const page2 = await page2Promise;
    await expect(page2.locator('h1')).toContainText(
        'Temu | Politica de privacidad',
    );
});
