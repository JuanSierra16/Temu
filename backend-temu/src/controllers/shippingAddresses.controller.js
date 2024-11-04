import { pool } from "../db.js"; // Ajusta la ruta según tu estructura de proyecto

// Crear una dirección de envío
export const createShippingAddress = async (req, res) => {
    const { usuario_id, pais, nombre, apellido, telefono, departamento, municipio, codigo_postal, numero_direccion, informacion_adicional } = req.body;

    try {
        const [result] = await pool.query(`
            INSERT INTO direcciones_envio (usuario_id, pais, nombre, apellido, telefono, departamento, municipio, codigo_postal, numero_direccion, informacion_adicional)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [usuario_id, pais, nombre, apellido, telefono, departamento, municipio, codigo_postal, numero_direccion, informacion_adicional]);

        res.status(201).json({ message: 'Dirección de envío creada exitosamente', id: result.insertId });
    } catch (error) {
        console.error('Error al crear la dirección de envío:', error);
        res.status(500).json({ message: 'Error al crear la dirección de envío' });
    }
};

// Obtener las direcciones de envío de un usuario
export const getShippingAddresses = async (req, res) => {
    const { usuario_id } = req.params;

    try {
        const [rows] = await pool.query('SELECT * FROM direcciones_envio WHERE usuario_id = ?', [usuario_id]);

        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener las direcciones de envío:', error);
        res.status(500).json({ message: 'Error al obtener las direcciones de envío' });
    }
};

// Actualizar una dirección de envío
export const updateShippingAddress = async (req, res) => {
    const { id } = req.params;
    const { pais, nombre, apellido, telefono, departamento, municipio, codigo_postal, numero_direccion, informacion_adicional } = req.body;

    try {
        await pool.query(`
            UPDATE direcciones_envio
            SET pais = ?, nombre = ?, apellido = ?, telefono = ?, departamento = ?, municipio = ?, codigo_postal = ?, numero_direccion = ?, informacion_adicional = ?
            WHERE id = ?
        `, [pais, nombre, apellido, telefono, departamento, municipio, codigo_postal, numero_direccion, informacion_adicional, id]);

        res.status(200).json({ message: 'Dirección de envío actualizada exitosamente' });
    } catch (error) {
        console.error('Error al actualizar la dirección de envío:', error);
        res.status(500).json({ message: 'Error al actualizar la dirección de envío' });
    }
};

// Eliminar una dirección de envío
export const deleteShippingAddress = async (req, res) => {
    const { id, usuario_id } = req.body;

    try {
        const [result] = await pool.query('DELETE FROM direcciones_envio WHERE id = ? AND usuario_id = ?', [id, usuario_id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Dirección de envío no encontrada o no pertenece al usuario' });
        }

        res.status(200).json({ message: 'Dirección de envío eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la dirección de envío:', error);
        res.status(500).json({ message: 'Error al eliminar la dirección de envío' });
    }
};