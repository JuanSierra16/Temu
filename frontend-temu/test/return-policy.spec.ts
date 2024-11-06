import { test, expect } from '@playwright/test';

test('Devoluciones', async ({ page }, testInfo) => {
    await page.goto('http://localhost:5173/');

    const link = page.getByRole('link', { name: 'Política de devolución y' });

    await expect(link).toBeVisible();

    await testInfo.attach('devoluciones', {
        body: await link.screenshot(),
        contentType: 'image/png',
    });

    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Política de devolución y' }).click();

    const page1 = await page1Promise;
    await expect(
        page1.getByRole('heading', { name: 'Temu | Política de devolución' }),
    ).toBeVisible();

    await testInfo.attach('devoluciones 2', {
        body: await page1.screenshot(),
        contentType: 'image/png',
    });

    await expect(page1.getByRole('article')).toContainText(
        '1. ¿Cómo puedo hacer una devolución?',
    );
    await expect(page1.getByRole('article')).toContainText(
        '2. Tarifa de envío de devolución',
    );
    await expect(page1.getByRole('article')).toContainText(
        '3. ¿Cuánto tiempo tengo antes de hacer una devolución?',
    );
    await expect(page1.getByRole('article')).toContainText('4. Reembolsos');
    await expect(page1.getByRole('article')).toContainText(
        '5. Plazo de reembolso',
    );
    await expect(page1.getByRole('article')).toContainText(
        '6. Aviso importante',
    );
});
