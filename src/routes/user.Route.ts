import express from "express";
import * as userController from "@src/controllers/user.Controller";
const router = express.Router();

router.get("/", userController.usersController);
router.post("/",userController.createUserController);
router.get("/:id",userController.getUserController);
router.put("/:id",userController.updateUserController);
router.delete("/:id",userController.deleteUserControloler);

export default router;
