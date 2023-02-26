import express from "express";
import * as AuthController from "@controllers/auth.Controller";

const router = express.Router();

router.post("/register-with-email-password", AuthController.registerWithEmailPasswordController);
router.post("/login-with-email-password", AuthController.loginWithEmailPasswordController);

export default router;
