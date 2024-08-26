import { Router } from "express";
import { loginUser } from "../controllers/users.controller.js";

const router = Router();

router.post('/users/login', loginUser);

export default router;