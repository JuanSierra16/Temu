import { Router } from 'express';
import { createCoupon, editCoupon, deleteCoupon, verifyCoupon } from '../controllers/coupons.controller.js'; // Ajusta la ruta según tu estructura de proyecto

const router = Router();

// Ruta para crear un cupón
router.post('/coupons', createCoupon);

// Ruta para editar un cupón
router.put('/coupons/:id', editCoupon);

// Ruta para eliminar un cupón
router.delete('/coupons/:id', deleteCoupon);

// Ruta para verificar si un cupón es válido
router.post('/coupons/verify', verifyCoupon);

export default router;