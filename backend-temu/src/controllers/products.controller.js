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