import { Request, Response } from "express";
import { Result} from "@common/index";
export const registerWithEmailPasswordController = (req: Request, res: Response) => {
    Result(res,"");
};

export const loginWithEmailPasswordController = (req: Request, res: Response) => {
    
    res.cookie("tokenChi", "eieiei", {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000// 1day
    });

    Result(res,"test");
};
