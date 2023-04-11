import express from "express";
import * as AuthController from "@controllers/auth.Controller";
import { validateInputs,registerValidator } from "@validator/index";
const router = express.Router();

router.post("/register-with-email-password",registerValidator,validateInputs, AuthController.registerWithEmailPasswordController);
router.post("/login-with-email-password", AuthController.loginWithEmailPasswordController);

export default router;
