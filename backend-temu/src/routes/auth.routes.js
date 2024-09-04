import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

router.get('/verify-token', verifyToken, (req, res) => {
    res.status(200).send({ auth: true, message: 'Token is valid' })
})

export default router;