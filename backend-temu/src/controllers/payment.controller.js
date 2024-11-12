import Stripe from "stripe";
import { STRIPE_PRIVATE_KEY } from "../config.js";

const stripe = new Stripe(STRIPE_PRIVATE_KEY);

// Crear una sesión de checkout
export const createCheckoutSession = async (req, res) => {
    const { usuario_id, productos, total, cupon_id, direccion_envio_id, currency, success_url, cancel_url } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: productos.map(item => ({
                price_data: {
                    currency: currency,
                    product_data: {
                        name: item.nombre,
                    },
                    unit_amount: item.precio,
                },
                quantity: item.cantidad,
            })),
            mode: 'payment',
            success_url,
            cancel_url,
            metadata: {
                usuario_id: usuario_id.toString(),
                total: total.toString(),
                cupon_id: cupon_id ? cupon_id.toString() : '',
                direccion_envio_id: direccion_envio_id ? direccion_envio_id.toString() : '',
                productos: JSON.stringify(productos),
            },
        });

        res.status(201).json({ id: session.id, url: session.url });
    } catch (error) {
        console.error('Error al crear la sesión de checkout:', error);
        res.status(500).json({ message: 'Error al crear la sesión de checkout' });
    }
};