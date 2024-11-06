import { test, expect } from '@playwright/test';

test('Cambiar el ancho de la ventana', async ({ page }, testInfo) => {
    const baseUrl = 'http://localhost:5173';

    const navigation = [
        {
            name: 'Más vendidos',
            path: baseUrl + '/best-sellers',
        },
        {
            name: '5 estrellas',
            path: baseUrl + '/five-stars',
        },
        {
            name: 'Amor y Amistad',
            path: baseUrl + '/five-stars/#',
        },
        {
            name: 'Recién llegados',
            path: baseUrl + '/new-comers',
        },
    ];

    // Configurar el tamaño de la ventana
    await page.setViewportSize({ width: 1500, height: 800 });

    await page.goto('http://localhost:5173/');

    await testInfo.attach('navigation 1', {
        body: await page.screenshot(),
        contentType: 'image/png',
    });

    // click on link text "Más vendidos"
    await page.getByText(navigation[0].name).click();
    let url = page.url();
    expect(url).toBe(navigation[0].path);

    await testInfo.attach('navigation 2', {
        body: await page.screenshot(),
        contentType: 'image/png',
    });

    // click on link text "5 estrellas"
    await page.getByText(navigation[1].name).click();
    url = page.url();
    expect(url).toBe(navigation[1].path);

    await testInfo.attach('navigation 3', {
        body: await page.screenshot(),
        contentType: 'image/png',
    });

    // click on link text "Amor y Amistad"
    await page.getByText(navigation[2].name).click();
    url = page.url();
    expect(url).toBe(navigation[2].path);

    await testInfo.attach('navigation 4', {
        body: await page.screenshot(),
        contentType: 'image/png',
    });

    // click on link text "Recientes"
    await page.getByText(navigation[3].name).click();
    url = page.url();
    expect(url).toBe(navigation[3].path);

    await testInfo.attach('navigation 5', {
        body: await page.screenshot(),
        contentType: 'image/png',
    });
});
