import express from "express";
import demoRoute from "@routes/demo.Route";
import authRoute from "@routes/auth.Route";
import userRoute from "@routes/user.Route";
import permisstionRoute from "@routes/permissions.Route";
import role from "@routes/role.Route";
import product from "@src/routes/product.Route";
import upload from "@src/routes/upload.Route";
const router = express.Router();

router.use("/demo", demoRoute);
router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/permissions", permisstionRoute);
router.use("/role", role);
router.use("/product",product);
router.use("/upload",upload);

export default router;
