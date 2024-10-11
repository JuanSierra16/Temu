import { pool } from "../db.js";

export const getProductos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos');
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los productos');
    }
}

// Controlador para obtener un producto por ID
export const getProductoById = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await pool.query(`
            SELECT 
                p.*, 
                pr.nombre AS proveedor_nombre, 
                pr.numero_seguidores, 
                pr.productos_vendidos, 
                pr.productos_asociados, 
                pr.ranking 
            FROM productos p
            JOIN proveedores pr ON p.proveedor_id = pr.id
            WHERE p.id = ?
        `, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el producto');
    }
};