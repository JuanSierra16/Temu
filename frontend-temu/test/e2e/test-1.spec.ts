import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.route('http://localhost:3000/users/login', async route => {
        console.log('Mock axios login request');
        await route.fulfill({
            status: 200,
            body: JSON.stringify({
                user: {
                    id: '123',
                    id_usuario_plataforma: '',
                    nombre_plataforma: '',
                    username: 'test',
                    email: 'test@mail.com',
                    phone_number: '',
                    is_verified: false,
                    created_at: '',
                    medida: {},
                },
                token: 'test-token',
            }),
        });
    });

    await page.route(
        'http://localhost:3000/users/login/has-profile',
        async route => {
            console.log('Mock axios has-profile request');
            await route.fulfill({
                status: 200,
                body: JSON.stringify({
                    exists: true,
                }),
            });
        },
    );

    await page.goto('http://localhost:5173/');
    await page.getByText('Iniciar sesión/Registrarse', { exact: true }).click();
    await page.locator('input[name="emailPhone"]').click();
    await page.locator('input[name="emailPhone"]').fill('mail@mail.com');
    await page.getByRole('button', { name: 'Continuar' }).click();
    await page.locator('input[name="password"]').click();
    await page.locator('input[name="password"]').fill('mail123');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();
    await page.getByText('Hola test', { exact: true }).click();
});
