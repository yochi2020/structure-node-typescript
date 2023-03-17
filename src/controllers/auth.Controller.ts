import { Request, Response,NextFunction } from "express";
import { errorHandle, Result } from "@common/index";
import UserModel from "@models/user.Model";
import messageModel from "@src/models/message.Model";
import jwt from "jsonwebtoken";

const getUserDataFromRquest = (req:Request) => {
    return new Promise((resolve, reject) => {
        const token = req.cookies.token;
        if (token) {
            jwt.verify(token, process.env.JWT_ACCESS_SECRET as string, (err:any, userData:any) => {
                if (err) throw err;
                resolve(userData);
            });
        } else {
            reject("no token");
        }
    });
};
export const registerWithEmailPasswordController =async (req: Request, res: Response,next:NextFunction) => {
    try {
        const { username, password } = req.body;
        const createUser =await UserModel.create({username,password});
        jwt.sign({ userId: createUser._id }, String(process.env.JWT_ACCESS_SECRET), (err:any, token:any) => {
            if(err) throw err;
            return res.cookie("token", token).status(201).json({
                id:createUser._id
            });
        });
    } catch (error) {
        next(error);
    }
};

export const loginWithEmailPasswordController = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const {username,password} = req.body;
        const userExists = await UserModel.findOne({ username });
        
        if (!userExists) {
            throw errorHandle("email do not exist Please sigup");
        }
      

        // res.cookie("tokenChi", "eieiei", {
        //     httpOnly: true,
        //     maxAge: 24 * 60 * 60 * 1000// 1day
        // });
        const checkPassword = await userExists.descryptPassword(password as string);
        if (!checkPassword) {
            throw errorHandle("Email and Password do not match");
        }
        jwt.sign({ userId: userExists._id,username:userExists.username }, process.env.JWT_ACCESS_SECRET as string, (err: any, token: any) => {
            return res.cookie("token", token).json({
                id: userExists._id,
            });
        });
    } catch (error) {
        next(error);
    }
};

export const logoutController = (req: Request, res: Response,next:NextFunction) => {
    try {
        res.clearCookie("token");
        res.end();
    } catch (error) {
        next(error);
    }
};

export const profileController = (req: Request, res: Response,next:NextFunction) => {
    try {
        const {token} = req.cookies;
        if (token) {
            jwt.verify(token, process.env.JWT_ACCESS_SECRET as string, (err:any, userData:any) => {
                if (err) throw err;
                
                res.json(userData);
            });
        } else {
            res.status(401).json("no token");
        }
    } catch (error) {
        next(error);
    }
};

export const messagesController =async (req: Request, res: Response,next:NextFunction) => {
    try {
        const { userId } = req.params;
        const userData:any =await getUserDataFromRquest(req);
        
        const ourUserId = userData.userId;
        const message = await messageModel.find({
            sender: { $in: [userId, ourUserId] },
            recipient:{$in:[userId,ourUserId]}
        }).sort({createAt:1});

        Result(res,message);

    } catch (error) {
        next(error);
    }
};

export const peopleController =async (req: Request, res: Response,next:NextFunction) => {
    try {
        const users = await UserModel.find({},{"_id":1,username:1});

        Result(res,users);
    } catch (error) {
        next(error);
    }
};
