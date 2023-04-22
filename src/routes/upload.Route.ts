import express from "express";
import * as uploadController from "@controllers/upload.Controller";
import { upLoadImages } from "@middleware/index";
import { apiRoute } from "@utils/index";
const router = express.Router();

router.post(apiRoute.upload.saveUpload,upLoadImages.single("image"),uploadController.uploadController);

export default router;