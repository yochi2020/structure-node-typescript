import express from "express";
import demoRoute from "@routes/demo.Route";
import authRoute from "@routes/auth.Route";
import userRoute from "@routes/user.Route";
import permisstionRoute from "@routes/permissions.Route";
import role from "@routes/role.Route";
import product from "@routes/product.Route";
import upload from "@routes/upload.Route";

const router = express.Router();

router.use(demoRoute);
router.use(authRoute);
router.use(userRoute);
router.use(permisstionRoute);
router.use(role);
router.use("/product",product);
router.use(upload);

export default router;
