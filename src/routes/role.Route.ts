import express from "express";
import * as roleController from "@controllers/role.Controller";
import { permissionMiddleware,authMiddleware,permissions } from "@middleware/index";
import { apiRoute } from "@utils/index";

const router = express.Router();

router.get(apiRoute.role.getRole,authMiddleware,permissionMiddleware(permissions.roles),roleController.getRoleController);
router.post(apiRoute.role.saveRole,roleController.createRoleController);
router.put(apiRoute.role.updateRole,roleController.updateRoleController);
router.delete(apiRoute.role.deleteRole,roleController.deleteRoleController);

export default router;