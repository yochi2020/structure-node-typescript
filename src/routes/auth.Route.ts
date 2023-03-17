import express from "express";
import * as AuthController from "@controllers/auth.Controller";

const router = express.Router();

router.post("/register-with-email-password", AuthController.registerWithEmailPasswordController);
router.post("/login-with-email-password", AuthController.loginWithEmailPasswordController);
router.get("/logout",AuthController.logoutController);
router.get("/profile", AuthController.profileController);
router.get("/messages/:userId",AuthController.messagesController);
router.get("/people",AuthController.peopleController);
export default router;
