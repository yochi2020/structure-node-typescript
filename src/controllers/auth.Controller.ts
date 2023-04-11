import { Request, Response,NextFunction } from "express";
import { Result, errorHandle } from "@common/index";
import { Users } from "@entity/index";
import { getManager } from "typeorm";
import { encryptPassword,checkPassword } from "@common/index";
export const registerWithEmailPasswordController = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const body = req.body;
        const repository = getManager().getRepository(Users);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const { password, ...user } = await repository.save({
            email:body.email,
            first_name:body.first_name,
            last_name:body.last_name,
            password:await encryptPassword(body.password)
        });
        Result(res,user);
    } catch (error) {
        next(error);
    }
};

export const loginWithEmailPasswordController = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const body = req.body;
        const repository = getManager().getRepository(Users);

        const user = await repository.findOneBy({ email:body.email });

        if(!user){
            throw errorHandle("User not found",404);
        }
        if(!await checkPassword(body.password,user.password)){
            throw errorHandle("invalid credentials",400);
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const { password, ...data } = user;

        // res.cookie("tokenChi", "eieiei", {
        //     httpOnly: true,
        //     maxAge: 24 * 60 * 60 * 1000// 1day
        // });
        Result(res,data);
    } catch (error) {
        next(error);
    }
};
