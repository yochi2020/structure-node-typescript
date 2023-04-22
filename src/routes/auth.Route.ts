import express from "express";
import * as AuthController from "@controllers/auth.Controller";
import { authMiddleware } from "@middleware/index";
import { validateInputs,registerValidator } from "@validator/index";
import { apiRoute } from "@utils/index";

const router = express.Router();

router.post(apiRoute.auth.registerWithEmailPassword,registerValidator,validateInputs, AuthController.registerWithEmailPasswordController);
router.post(apiRoute.auth.loginWithEmailPassword, AuthController.loginWithEmailPasswordController);
router.post(apiRoute.auth.logout,authMiddleware,AuthController.logoutController);
router.get(apiRoute.auth.user,authMiddleware,AuthController.authenticatedUserController);
router.put(apiRoute.auth.userInfo,authMiddleware,AuthController.updateInfoController);
router.put(apiRoute.auth.userPassword,authMiddleware,AuthController.updatePasswordController);


export default router;
