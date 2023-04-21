import express from "express";
import * as productController from "@controllers/product.Controller";
const router = express.Router();

router.get("/",productController.getProductsController);
router.get("/:id",productController.getProductController);
router.post("/",productController.createProductController);
router.put("/:id",productController.updateProductController);
router.delete("/:id",productController.deleteProductController);

export default router;