import { Router } from "express";
import { getUsers } from "../controllers/users.controller.js";

const router = Router();

app.get('/users', getUsers);

export default router;