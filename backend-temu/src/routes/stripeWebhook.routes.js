import { Router } from 'express';
import { handleStripeWebhook } from '../controllers/stripeWebhook.controller.js';
import express from 'express';

const router = Router();

// Ruta para manejar el webhook de Stripe
router.post('/stripe/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

export default router;