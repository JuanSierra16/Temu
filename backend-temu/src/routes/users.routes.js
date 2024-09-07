import { Router } from "express";
import { loginUser } from "../controllers/users.controller.js";

const router = Router();

router.post('/users/login', loginUser);
router.post('/users/login/platform', loginUserPlatform);

export default router;