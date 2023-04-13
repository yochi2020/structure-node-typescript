import express from "express";
import * as roleController from "@controllers/role.Controller";
const router = express.Router();

router.get("/:id",roleController.getRoleController);
router.post("/",roleController.createRoleController);
router.put("/:id",roleController.updateRoleController);
router.delete("/:id",roleController.deleteRoleController);

export default router;