import express from "express";
import * as userController from "@src/controllers/user.Controller";
import { apiRoute } from "@utils/index";

const router = express.Router();

router.get(apiRoute.users.getAllUser, userController.usersController);
router.get(apiRoute.users.getUser,userController.getUserController);
router.post(apiRoute.users.saveUser,userController.createUserController);
router.put(apiRoute.users.updateUser,userController.updateUserController);
router.delete(apiRoute.users.deleteUser,userController.deleteUserControloler);

export default router;
