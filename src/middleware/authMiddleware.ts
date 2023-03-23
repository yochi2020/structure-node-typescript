import { errorHandle } from "@common/index";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            throw errorHandle("Please sigin",401);
        }

        const decode = await jwt.verify(token,String(process.env.JWT_ACCESS_SECRET));
        req.user = decode;

        next();
    } catch (error) {
        next(error);
    }
};