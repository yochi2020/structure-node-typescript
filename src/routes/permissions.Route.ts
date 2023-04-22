import express from "express";
import * as perrmissionController from "@controllers/permission.Controller";
import { apiRoute } from "@utils/index";
const router = express.Router();

router.get(apiRoute.permissions.getPermissions,perrmissionController.permissionsController);

export default router;