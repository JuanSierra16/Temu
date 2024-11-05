import { test, expect } from '@playwright/test';

test('Cambio de contraseña E2E', async ({ page }, testInfo) => {
    await page.route(
        'http://localhost:3000/users/send-verificaction-code',
        async route => {
            console.log('Mock axios verification-code request');
            await route.fulfill({
                status: 200,
                body: JSON.stringify({
                    code: '123456',
                }),
            });
        },
    );

    await page.route(
        'http://localhost:3000/users/update-password',
        async route => {
            console.log('Mock axios update-password request');
            await route.fulfill({
                status: 200,
                body: JSON.stringify({
                    user: {
                        username: 'test',
                        email: 'test@mail.com',
                    },
                }),
            });
        },
    );

    await page.goto('http://localhost:5173/');

    await page.getByText('Pedidos y cuenta').click();

    await testInfo.attach('Login Form', {
        body: await page.screenshot(),
        contentType: 'image/png',
    });

    await page.getByText('¿Tienes problemas para').click();
    await page.getByRole('button', { name: 'Restablecer Contraseña' }).click();

    await testInfo.attach('Login Form 2', {
        body: await page.screenshot(),
        contentType: 'image/png',
    });

    await page.getByPlaceholder('Dirección de email').click();
    await page.getByPlaceholder('Dirección de email').fill('test@mail.com');
    await page.getByRole('button', { name: 'Enviar' }).click();
    await page
        .locator('ul')
        .filter({
            hasText:
                'Iniciar sesión/RegistrarsePedidos y cuentaIngresa el código de restablecimiento',
        })
        .getByRole('textbox')
        .click();

    await testInfo.attach('Login Form 3', {
        body: await page.screenshot(),
        contentType: 'image/png',
    });

    await page
        .locator('ul')
        .filter({
            hasText:
                'Iniciar sesión/RegistrarsePedidos y cuentaIngresa el código de restablecimiento',
        })
        .getByRole('textbox')
        .fill('123456');
    await expect(
        page.getByRole('heading', { name: 'Crea una nueva contraseña' }),
    ).toBeVisible();

    await testInfo.attach('Login Form 2', {
        body: await page.screenshot(),
        contentType: 'image/png',
    });

    await page.getByPlaceholder('Ingresa una nueva contraseña').click();
    await page.getByPlaceholder('Ingresa una nueva contraseña').fill('test123');
    await page.getByRole('button', { name: 'Restablecer' }).click();
    await expect(page.getByText('Hola test')).toBeVisible();

    await testInfo.attach('Login Form 4', {
        body: await page.screenshot(),
        contentType: 'image/png',
    });
});
