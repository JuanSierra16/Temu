import Stripe from "stripe";
import { STRIPE_PRIVATE_KEY, STRIPE_WEBHOOK_SECRET } from "../config.js";
import { pool } from "../db.js";

const stripe = new Stripe(STRIPE_PRIVATE_KEY);
const endpointSecret = STRIPE_WEBHOOK_SECRET;

export const handleStripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];

    console.log('Webhook recibido');

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error('Error al verificar el webhook:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;

            // Aquí puedes realizar operaciones adicionales, como reducir el stock o enviar un correo electrónico al usuario
            try {
                console.log('Evento de sesión de checkout completado recibido:', session);

                //Guardar la información de la sesión en la base de datos

                //Enviar un correo al usuario

                // Ejemplo: Reducir el stock
                /* const { items } = session.metadata;
                for (const item of JSON.parse(items)) {
                    await pool.query('UPDATE productos SET stock = stock - ? WHERE id = ?', [item.quantity, item.product_id]);
                } */

                // Ejemplo: Enviar un correo electrónico al usuario
                // await sendEmailToUser(session.customer_email, 'Gracias por tu compra', 'Tu pedido ha sido recibido y está en proceso.');

                console.log('Operaciones adicionales completadas');
            } catch (error) {
                console.error('Error al realizar operaciones adicionales:', error);
            }

            break;
        // ... manejar otros tipos de eventos
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).json({ received: true });
};