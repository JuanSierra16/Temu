// Footer.test.jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from '../src/components/sections/Footer';
import { BrowserRouter } from 'react-router-dom';
import { ProductsContext } from '../src/provider/ProductsContext';

describe('Footer Component', () => {
    const renderFooter = () =>
        render(
            <BrowserRouter>
                <ProductsContext.Provider value={{ products: [] }}> {/* Mock de ProductsContext */}
                    <Footer />
                </ProductsContext.Provider>
            </BrowserRouter>
        );

    it('debería renderizar los enlaces de información de la empresa', () => {
        renderFooter();
        expect(screen.getByText('Acerca de Temu')).toBeInTheDocument();
        expect(
            screen.getByText('Afililado e influencer: gana comisiones')
        ).toBeInTheDocument();
    });

    it('debería renderizar los enlaces de atención al cliente', () => {
        renderFooter();
        expect(
            screen.getByText('Política de devolución y reembolso')
        ).toBeInTheDocument();
        expect(screen.getByText('Política de propiedad intelectual')).toBeInTheDocument();
    });

    it('debería renderizar los enlaces de ayuda', () => {
        renderFooter();
        expect(
            screen.getByText('Centro de ayuda y preguntas frecuentes')
        ).toBeInTheDocument();
        expect(screen.getByText('Centro de seguridad')).toBeInTheDocument();
    });

    it('debería renderizar los íconos de redes sociales', () => {
        renderFooter();
        expect(screen.getByRole('link', { name: /Instagram/i })).toHaveAttribute(
            'href',
            'https://www.instagram.com/temu/'
        );
        expect(screen.getByRole('link', { name: /Facebook/i })).toHaveAttribute(
            'href',
            'https://www.facebook.com/shoptemu/'
        );
    });

    it('debería renderizar las imágenes de certificación de seguridad', () => {
        renderFooter();
        const certImages = screen.getAllByAltText('');
        expect(certImages.length).toBeGreaterThan(0); // Verifica que haya imágenes de certificación
    });

    it('debería mostrar el enlace a la App Store y Google Play', () => {
        renderFooter();
        expect(screen.getByRole('link', { name: /Google Play/i })).toHaveAttribute(
            'href',
            expect.stringContaining('play.google.com')
        );
        expect(screen.getByRole('link', { name: /App Store/i })).toHaveAttribute(
            'href',
            expect.stringContaining('apps.apple.com')
        );
    });

    it('debería mostrar los enlaces de términos y política en el footer inferior', () => {
        renderFooter();
        expect(screen.getByText('Términos de uso.')).toBeInTheDocument();
        expect(screen.getByText('Política de privacidad.')).toBeInTheDocument();
    });
});
