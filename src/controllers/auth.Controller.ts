import { Request, Response,NextFunction } from "express";
import { Result } from "@common/index";
export const registerWithEmailPasswordController = (req: Request, res: Response,next:NextFunction) => {
    try {
        Result(res,"");
    } catch (error) {
        next(error);
    }
};

export const loginWithEmailPasswordController = (req: Request, res: Response,next:NextFunction) => {
    try {
        res.cookie("tokenChi", "eieiei", {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000// 1day
        });
        Result(res,"test");
    } catch (error) {
        next(error);
    }
};
