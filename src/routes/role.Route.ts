import express from "express";
import * as roleController from "@controllers/role.Controller";
import { permissionMiddleware,authMiddleware,permissions } from "@middleware/index";
const router = express.Router();

router.get("/:id",authMiddleware,permissionMiddleware(permissions.roles),roleController.getRoleController);
router.post("/",roleController.createRoleController);
router.put("/:id",roleController.updateRoleController);
router.delete("/:id",roleController.deleteRoleController);

export default router;