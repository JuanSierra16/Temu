import Stripe from "stripe";
import { STRIPE_PRIVATE_KEY } from "../config.js";

const stripe = new Stripe(STRIPE_PRIVATE_KEY);

//Necesito recibir del frontend un objeto con la siguiente estructura:
const reqBody = {
    usuario_id: 1,
    productos: [
        {
            id: 1,
            nombre: 'Producto 1',
            precio: 1000,
            cantidad: 2
        },
    ],
    total: 2000,
    cupon_id: 1,
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
}


// Crear una sesión de checkout
export const createCheckoutSession = async (req, res) => {
    const { items, success_url, cancel_url } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: items.map(item => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.amount,
                },
                quantity: item.quantity,
            })),
            metadata: {
                //Aqui puedo enviar información adicional, como el ID del usuario, de los productos
                //Ejemplo
                product_id: 1,
            },
            mode: 'payment',
            success_url,
            cancel_url,
        });

        res.status(201).json({ id: session.id, url: session.url });
    } catch (error) {
        console.error('Error al crear la sesión de checkout:', error);
        res.status(500).json({ message: 'Error al crear la sesión de checkout' });
    }
};