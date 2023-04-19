import express from "express";
import * as demoController from "@src/controllers/demo.Controller";
import { upLoadImages } from "@middleware/index";
const router = express.Router();

router.get("/test1", demoController.demoOneController);
router.post(
    "/upload-multer",
    upLoadImages.array("image"),
    demoController.uploadMulterController
);
router.post("/upload-formidable", demoController.uploadFormidableController);

export default router;
