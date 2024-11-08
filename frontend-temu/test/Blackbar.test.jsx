// BlackBar.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BlackBar from '../src/components/sections/BlackBar';

describe('BlackBar Component', () => {
    it('debería mostrar todos los iconos y textos iniciales', () => {
        render(<BlackBar />);

        // Verifica que los iconos y textos principales estén presentes
        expect(screen.getByText('Envío gratis en cada pedido')).toBeInTheDocument();
        expect(screen.getByText('Devoluciones: 90 días')).toBeInTheDocument();
        expect(screen.getByText('Descarga la app de Temu')).toBeInTheDocument();
    });

    it('debería abrir el primer modal al hacer clic en "Envío gratis en cada pedido"', () => {
        render(<BlackBar />);
        
        // Hace clic en el primer artículo
        fireEvent.click(screen.getByText('Envío gratis en cada pedido'));
        
        // Verifica que el modal esté abierto
        expect(screen.getByText('Envío gratis')).toBeInTheDocument();
    });

    it('debería cerrar el primer modal al hacer clic en el botón "Ok"', async() => {
        render(<BlackBar />);
        
        // Abre el modal
        fireEvent.click(screen.getByText('Envío gratis en cada pedido'));

        const modal = await screen.findByText('Envío gratis');

        // Cierra el modal
        fireEvent.click(screen.getByRole('button', { name: /ok/i }));
        

        await waitFor(async () => {
            // Verifica que el modal ya no esté en el documento
            expect(modal).not.toBeInTheDocument();
        });
    });

    

    it('debería abrir el segundo modal al hacer clic en "Devoluciones: 90 días"', () => {
        render(<BlackBar />);

        // Hace clic en el segundo artículo
        fireEvent.click(screen.getByText('Devoluciones: 90 días'));
        
        // Verifica que el modal esté abierto
        expect(screen.getByText('Especial para ti')).toBeInTheDocument();
    });

    it('debería abrir el tercer modal al hacer clic en "Descarga la app de Temu"', () => {
        render(<BlackBar />);

        // Hace clic en el tercer artículo
        fireEvent.click(screen.getByText('Descarga la app de Temu'));
        
        // Verifica que el modal esté abierto
        expect(screen.getByText('Descarga la app de Temu para disfrutar')).toBeInTheDocument();
    });
});
