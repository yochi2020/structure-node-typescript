import { Request, Response,NextFunction } from "express";
import { Result,errorHandle } from "@common/index";
import { UserModel } from "@models/index";
export const registerWithEmailPasswordController = async (req: Request, res: Response,next:NextFunction) => {
    try {
        
        const { firstname,email,password,password_confirm} = req.body;
        const userExists = await UserModel.findOne({
            $or: [{ email: email }, { firstname:firstname }],
        });
    
        if (userExists) {
            throw errorHandle("username with the same email already exist");
        }

        if (password !== password_confirm) {
            throw errorHandle("Password's do not match");
        }
        const newUser = await UserModel.create(req.body);
        // const token = jwt.sign(
        //     { email, password, username },
        //     String(process.env.JWT_ACCOUNT_ACTIVATION),
        //     { expiresIn: "10m" },
        // );


        Result(res,newUser);
    } catch (error) {
        next(error);
    }
};

export const loginWithEmailPasswordController = async(req: Request, res: Response,next:NextFunction) => {
    try {
        // const { firstname,lastname,email,mobile,password,password_confirm} = req.body;
        
        // const findUser = await UserModel.findOne({ email });
        // console.log("🚀 ~ file: auth.Controller.ts:39 ~ loginWithEmailPasswordController ~ findUser:", await findUser?.isPasswordMatched(password));
        // console.log(await new UserModel().isPasswordMatched(password));
    
       

        // if (password !== password_confirm) {
        //     throw errorHandle("Password's do not match");
        // }

        // const token = jwt.sign(
        //     { email, password, username },
        //     String(process.env.JWT_ACCOUNT_ACTIVATION),
        //     { expiresIn: "10m" },
        // );


        Result(res,req.body);
    } catch (error) {
        next(error);
    }
};
