import { pool } from "../db.js";

// Obtener un pedido por ID
export const obtenerPedidoPorId = async (req, res) => {
    const { id } = req.params;

    try {
        // Obtener el pedido
        const [pedidoRows] = await pool.query('SELECT * FROM pedidos WHERE id = ?', [id]);
        if (pedidoRows.length === 0) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }
        const pedido = pedidoRows[0];

        // Obtener los detalles del pedido
        const [detallesRows] = await pool.query('SELECT * FROM detalles_pedido WHERE pedido_id = ?', [id]);

        // Obtener la información de envío
        const [envioRows] = await pool.query('SELECT * FROM direcciones_envio WHERE id = ?', [pedido.direccion_envio_id]);

        res.status(200).json({ pedido, detalles: detallesRows, envio: envioRows[0] });
    } catch (error) {
        console.error('Error al obtener el pedido:', error);
        res.status(500).json({ message: 'Error al obtener el pedido' });
    }
};

// Obtener los pedidos de un usuario
export const obtenerPedidosPorUsuario = async (req, res) => {
    const { usuario_id } = req.params;

    try {
        // Obtener los pedidos del usuario
        const [pedidosRows] = await pool.query('SELECT * FROM pedidos WHERE usuario_id = ?', [usuario_id]);
        if (pedidosRows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron pedidos para este usuario' });
        }

        // Obtener los detalles de cada pedido y la información de envío
        const pedidosConDetalles = await Promise.all(pedidosRows.map(async (pedido) => {
            const [detallesRows] = await pool.query('SELECT * FROM detalles_pedido WHERE pedido_id = ?', [pedido.id]);
            const [envioRows] = await pool.query('SELECT * FROM direcciones_envio WHERE id = ?', [pedido.direccion_envio_id]);
            return { ...pedido, detalles: detallesRows, envio: envioRows[0] };
        }));

        res.status(200).json(pedidosConDetalles);
    } catch (error) {
        console.error('Error al obtener los pedidos del usuario:', error);
        res.status(500).json({ message: 'Error al obtener los pedidos del usuario' });
    }
};

// Eliminar un pedido por ID
export const eliminarPedidoPorId = async (req, res) => {
    const { id } = req.params;

    try {
        // Verificar si el pedido existe
        const [pedidoRows] = await pool.query('SELECT * FROM pedidos WHERE id = ?', [id]);
        if (pedidoRows.length === 0) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        // Eliminar los detalles del pedido
        await pool.query('DELETE FROM detalles_pedido WHERE pedido_id = ?', [id]);

        // Eliminar el pedido
        await pool.query('DELETE FROM pedidos WHERE id = ?', [id]);

        res.status(200).json({ message: 'Pedido eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el pedido:', error);
        res.status(500).json({ message: 'Error al eliminar el pedido' });
    }
};

// Actualizar el estado de un pedido
export const actualizarEstadoPedido = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    try {
        // Verificar si el pedido existe
        const [pedidoRows] = await pool.query('SELECT * FROM pedidos WHERE id = ?', [id]);
        if (pedidoRows.length === 0) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        // Actualizar el estado del pedido
        await pool.query('UPDATE pedidos SET estado = ? WHERE id = ?', [estado, id]);

        res.status(200).json({ message: 'Estado del pedido actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el estado del pedido:', error);
        res.status(500).json({ message: 'Error al actualizar el estado del pedido' });
    }
};