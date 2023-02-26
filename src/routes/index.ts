import express from "express";
import demoRoute from "@routes/demo.Route";
import authRoute from "@routes/auth.Route";
const router = express.Router();

router.use("/demo", demoRoute);
router.use("/auth", authRoute);

export default router;
