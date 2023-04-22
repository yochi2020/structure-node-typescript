import express from "express";
import * as uploadController from "@controllers/upload.Controller";
import { upLoadImages } from "@middleware/index";
const router = express.Router();

router.post("",upLoadImages.single("image"),uploadController.uploadController);

export default router;