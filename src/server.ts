import express, { NextFunction, Request, Response } from "express";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import cookieSession from "cookie-parser";
import baseRoute from "@routes/index";
import { errorHandle } from "@common/index";
import { errorMiddleware } from "@middleware/index";
const app = express();

app.use(morgan("dev"));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true       //cliend can use automate cookie
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended:false }));
app.use(cookieSession());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", baseRoute);
app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(errorHandle("api ไม่อยู่ในระบบ", 404));
});
app.use(errorMiddleware);
export default app;
