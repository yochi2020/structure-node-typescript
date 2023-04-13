import express from "express";
import demoRoute from "@routes/demo.Route";
import authRoute from "@routes/auth.Route";
import userRoute from "@routes/user.Route";
import permisstionRoute from "@routes/permissions.Route";
import role from "@routes/role.Route";
const router = express.Router();

router.use("/demo", demoRoute);
router.use("/auth", authRoute);
router.use("/users",userRoute);
router.use("/permissions",permisstionRoute);
router.use("/role",role);

export default router;
