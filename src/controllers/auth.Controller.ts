import { Request, Response, NextFunction } from "express";
import { Result, errorHandle, generateAccessToken, generateRefreshToken } from "@common/index";
import { UserModel } from "@models/index";
export const registerWithEmailPasswordController = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { firstname, email, password, password_confirm } = req.body;
        const userExists = await UserModel.findOne({
            $or: [{ email: email }, { firstname: firstname }],
        });

        if (userExists) {
            throw errorHandle("username with the same email already exist");
        }

        if (password !== password_confirm) {
            throw errorHandle("Password's do not match");
        }
        const newUser = await UserModel.create(req.body);
        Result(res, newUser);
    } catch (error) {
        next(error);
    }
};

export const loginWithEmailPasswordController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const userExists = await UserModel.findOne({ email });
        if (!userExists) {
            throw errorHandle("email do not exist Please sigup");
        }

        if (!await userExists.isPasswordMatched(password)) {
            throw errorHandle("Email and Password do not match");
        }

        const token = await generateAccessToken(userExists?.id);

        const refreshToken = await generateRefreshToken(userExists?.id);

        Result(res, {
            token,
            refreshToken
        });
    } catch (error) {
        next(error);
    }
};
