import { Router } from "express";
import {
  loginUser,
  loginUserPlatform,
  sendVerificationCode,
  updatePassword,
  sendVerificationCodeSMS,
  loginWithPhoneNumber,
  hasProfile,
  findAccountByEmail,
  findAccountByPhoneNumber
} from "../controllers/users.controller.js";

const router = Router();

router.post("/users/login", loginUser);
router.post("/users/login/platform", loginUserPlatform);
router.post("/users/send-verificaction-code", sendVerificationCode);
router.post("/users/update-password", updatePassword);
router.post("/users/send-verification-code-sms", sendVerificationCodeSMS);
router.post("/users/login-with-phone", loginWithPhoneNumber);
// Ruta para verificar si un email existe en la base de datos
router.post("/users/login/has-profile", hasProfile);
// Ruta para encontrar una cuenta por email
router.post('/users/find-by-email', findAccountByEmail);
// Ruta para encontrar una cuenta por teléfono
router.post('/users/find-by-phone', findAccountByPhoneNumber);

export default router;
