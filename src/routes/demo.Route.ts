import express from "express";
import * as demoController from "@controllers/demo.Controller";
import { upLoadImages } from "@middleware/index";
const router = express.Router();

router.get("/demo/test1", demoController.demoOneController);
router.post(
    "/demo/upload-multer",
    upLoadImages.array("image"),
    demoController.uploadMulterController
);
router.post("/demo/upload-formidable", demoController.uploadFormidableController);

export default router;
