import { pool } from "../db.js";

// Crear un cupón
export const createCoupon = async (req, res) => {
    const { codigo, descuento, fecha_expiracion } = req.body;

    try {
        const [result] = await pool.query(`
            INSERT INTO cupones_descuento (codigo, descuento, fecha_expiracion)
            VALUES (?, ?, ?)
        `, [codigo, descuento, fecha_expiracion]);

        res.status(201).json({ message: 'Cupón creado exitosamente', id: result.insertId });
    } catch (error) {
        console.error('Error al crear el cupón:', error);
        res.status(500).json({ message: 'Error al crear el cupón' });
    }
};

// Editar un cupón
export const editCoupon = async (req, res) => {
    const { id } = req.params;
    const { codigo, descuento, fecha_expiracion } = req.body;

    try {
        await pool.query(`
            UPDATE cupones_descuento
            SET codigo = ?, descuento = ?, fecha_expiracion = ?
            WHERE id = ?
        `, [codigo, descuento, fecha_expiracion, id]);

        res.status(200).json({ message: 'Cupón actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar el cupón:', error);
        res.status(500).json({ message: 'Error al actualizar el cupón' });
    }
};

// Eliminar un cupón
export const deleteCoupon = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM cupones_descuento WHERE id = ?', [id]);

        res.status(200).json({ message: 'Cupón eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el cupón:', error);
        res.status(500).json({ message: 'Error al eliminar el cupón' });
    }
};

// Verificar si un cupón es válido
export const verifyCoupon = async (req, res) => {
    const { codigo, usuario_id } = req.body;

    try {
        // Verificar si el cupón existe y no ha expirado
        const [couponRows] = await pool.query('SELECT * FROM cupones_descuento WHERE codigo = ? AND fecha_expiracion >= CURDATE()', [codigo]);

        if (couponRows.length === 0) {
            return res.status(404).json({ message: 'Cupón no válido o expirado' });
        }

        const cupon_id = couponRows[0].id;

        // Verificar si el cupón ya ha sido utilizado por el usuario
        const [usageRows] = await pool.query('SELECT * FROM historial_cupones WHERE cupon_id = ? AND usuario_id = ?', [cupon_id, usuario_id]);

        if (usageRows.length > 0) {
            return res.status(400).json({ message: 'Cupón ya ha sido utilizado por este usuario' });
        }

        res.status(200).json({ message: 'Cupón válido', cupon: couponRows[0] });
    } catch (error) {
        console.error('Error al verificar el cupón:', error);
        res.status(500).json({ message: 'Error al verificar el cupón' });
    }
};