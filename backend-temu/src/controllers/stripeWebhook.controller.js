import Stripe from "stripe";
import { STRIPE_PRIVATE_KEY, STRIPE_WEBHOOK_SECRET, TRACKING_URL } from "../config.js";
import { pool } from "../db.js";
import transporter from "./../config/nodemailer.js";

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

                // Guardar la información del pedido en la base de datos
                const { usuario_id, total, cupon_id, direccion_envio_id, productos } = session.metadata;

                // Convertir los valores a su tipo original
                const usuarioId = parseInt(usuario_id, 10);
                const totalAmount = parseFloat(total);
                const cuponId = cupon_id ? parseInt(cupon_id, 10) : null;
                const direccionEnvioId = direccion_envio_id ? parseInt(direccion_envio_id, 10) : null;

                console.log('Valores convertidos:', { usuarioId, totalAmount, cuponId, direccionEnvioId });

                // Verificar si la dirección de envío existe
                const [direccionRows] = await pool.query('SELECT * FROM direcciones_envio WHERE id = ?', [direccionEnvioId]);
                if (direccionRows.length === 0) {
                    console.error('Dirección de envío no encontrada');
                    return res.status(404).json({ message: 'Dirección de envío no encontrada' });
                }

                const direccionEnvio = direccionRows[0];
                console.log('Dirección de envío encontrada:', direccionRows);

                // Crear el pedido
                const [pedidoResult] = await pool.query(
                    'INSERT INTO pedidos (usuario_id, total, estado, cupon_id, direccion_envio_id) VALUES (?, ?, ?, ?, ?)',
                    [usuarioId, totalAmount, 'procesando', cuponId, direccionEnvioId]
                );

                const pedido_id = pedidoResult.insertId;
                console.log('Pedido creado con ID:', pedido_id);

                // Deserializar los productos
                const productosArray = JSON.parse(productos);
                console.log('Productos deserializados:', productosArray);

                // Guardar los detalles del pedido
                for (const item of productosArray) {
                    const { id, precio, cantidad } = item;

                    await pool.query(
                        'INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad, precio) VALUES (?, ?, ?, ?)',
                        [pedido_id, id, cantidad, precio] // El precio ya está en la unidad principal
                    );

                    console.log('Detalle del pedido guardado:', { pedido_id, id, cantidad, precio });

                    // Actualizar el stock del producto
                    await pool.query(
                        'UPDATE productos SET stock = stock - ? WHERE id = ?',
                        [cantidad, id]
                    );

                    console.log('Stock del producto actualizado:', { id, cantidad });
                }

                // Guardar el historial de cupones si hay un cupon_id
                if (cuponId) {
                    await pool.query(
                        'INSERT INTO historial_cupones (cupon_id, pedido_id, usuario_id) VALUES (?, ?, ?)',
                        [cuponId, pedido_id, usuarioId]
                    );
                    console.log('Historial de cupones guardado:', { cuponId, pedido_id, usuarioId });
                }

                //Enviar un correo electrónico al usuario
                // Obtener el correo electrónico del usuario
                const [userRows] = await pool.query('SELECT email FROM users WHERE id = ?', [usuarioId]);
                if (userRows.length === 0) {
                    console.error('Usuario no encontrado');
                    return res.status(404).json({ message: 'Usuario no encontrado' });
                }

                const userEmail = userRows[0].email;

                // Construir el contenido del correo electrónico en HTML
                const productosInfo = productosArray.map(item => {
                    return `<p><strong>Producto:</strong> ${item.nombre}, <strong>Cantidad:</strong> ${item.cantidad}, <strong>Precio:</strong> ${item.precio}</p>`;
                }).join('');

                const trackingUrl = TRACKING_URL || 'http://localhost:5173';

                const emailContent = `
                    <p>Gracias por tu compra. Tu pedido con Link de seguimiento <a href="${trackingUrl}/orders/${pedido_id}">${trackingUrl}/orders/${pedido_id}</a> ha sido recibido y está en proceso.</p>
                    <h3>Detalles del pedido #${pedido_id}:</h3>
                    ${productosInfo}
                    <p><strong>Estado</strong>: Procesando</p>
                    <h3>Información de envío:</h3>
                    <p><strong>Nombre:</strong> ${direccionEnvio.nombre}</p>
                    <p><strong>Apellido:</strong> ${direccionEnvio.apellido}</p>
                    <p><strong>Dirección:</strong> ${direccionEnvio.numero_direccion}, ${direccionEnvio.municipio}, ${direccionEnvio.departamento}, ${direccionEnvio.pais}</p>
                    <p><strong>Código Postal:</strong> ${direccionEnvio.codigo_postal}</p>
                    <p><strong>Teléfono:</strong> ${direccionEnvio.telefono}</p>
                `;

                // Enviar un correo electrónico al usuario
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: userEmail,
                    subject: 'Confirmación de Pedido',
                    html: emailContent
                };

                await transporter.sendMail(mailOptions);
                console.log('Correo electrónico enviado a:', userEmail);

                console.log('Operaciones adicionales completadas');
            } catch (error) {
                console.error('Error al realizar operaciones adicionales:', error);
            }

            break;

        case 'checkout.session.async_payment_failed':
            const failedSession = event.data.object;

            try {
                console.log('Evento de sesión de pago fallido recibido:', failedSession);

                // Obtener el correo electrónico del usuario
                const { usuario_id } = failedSession.metadata;
                const usuarioId = parseInt(usuario_id, 10);

                const [userRows] = await pool.query('SELECT email FROM users WHERE id = ?', [usuarioId]);
                if (userRows.length === 0) {
                    console.error('Usuario no encontrado');
                    return res.status(404).json({ message: 'Usuario no encontrado' });
                }

                const userEmail = userRows[0].email;

                // Construir el contenido del correo electrónico en HTML
                const emailContentFailed = `
                    <p>Lo sentimos, pero no pudimos completar tu pedido debido a un problema con el pago.</p>
                    <p>Por favor, intenta nuevamente o contacta a nuestro soporte para más información.</p>
                `;

                // Enviar un correo electrónico al usuario
                const mailOptionsFailed = {
                    from: process.env.EMAIL_USER,
                    to: userEmail,
                    subject: 'Error en el Pedido',
                    html: emailContentFailed
                };

                await transporter.sendMail(mailOptionsFailed);
                console.log('Correo electrónico de error enviado a:', userEmail);

            } catch (error) {
                console.error('Error al manejar el evento de pago fallido:', error);
            }

            break;
        // ... manejar otros tipos de eventos
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).json({ received: true });
};