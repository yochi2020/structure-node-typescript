import { Request, Response,NextFunction } from "express";
import { Result } from "@common/index";
import UserModel from "@models/user.Model";
import jwt  from "jsonwebtoken";
export const registerWithEmailPasswordController =async (req: Request, res: Response,next:NextFunction) => {
    try {
        const { username, password } = req.body;
        const createUser =await UserModel.create({username,password});
        jwt.sign({ userId: createUser._id }, String(process.env.JWT_SECRET), (err:any, token:any) => {
            if(err) throw err;
            return res.cookie("token",token).status(201).json("ok");
        });
    } catch (error) {
        next(error);
    }
};

export const loginWithEmailPasswordController = (req: Request, res: Response) => {
    
    res.cookie("tokenChi", "eieiei", {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000// 1day
    });

    Result(res,"test");
};
