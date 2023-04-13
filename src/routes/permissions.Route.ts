import express from "express";
import * as perrmissionController from "@controllers/permission.Controller";
const router = express.Router();

router.get("/",perrmissionController.permissionsController);

export default router;