import express from "express";
import * as AuthController from "@controllers/auth.Controller";
import { authMiddleware } from "@middleware/index";
import { validateInputs,registerValidator } from "@validator/index";
const router = express.Router();

router.post("/register-with-email-password",registerValidator,validateInputs, AuthController.registerWithEmailPasswordController);
router.post("/login-with-email-password", AuthController.loginWithEmailPasswordController);
router.post("/logout",authMiddleware,AuthController.logoutController);
router.get("/user",authMiddleware,AuthController.authenticatedUserController);
router.put("/user/info",authMiddleware,AuthController.updateInfoController);
router.put("/user/password",authMiddleware,AuthController.updatePasswordController);


export default router;
