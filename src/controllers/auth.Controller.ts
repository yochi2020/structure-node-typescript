import { Request, Response,NextFunction } from "express";
import { Result, errorHandle,hashPassword,verifyPassword,generateAccessToken } from "@utils/index";
import { Users } from "@entity/index";
import { getManager } from "typeorm";

export const registerWithEmailPasswordController = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const body = req.body;
        const repository = getManager().getRepository(Users);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const { password, ...user } = await repository.save({
            email:body.email,
            firstName:body.first_name,
            lastName:body.last_name,
            password:await hashPassword(body.password),
            role:{ id:body.role_id }
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
        if(!await verifyPassword(body.password,user.password)){
            throw errorHandle("invalid credentials",400);
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const { password, ...data } = user;

        const token = await generateAccessToken(data.id);

        res.cookie("jwt", token ,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000// 1day
        });
        Result(res,{
            message:"success"
        });
    } catch (error) {
        next(error);
    }
};

export const authenticatedUserController = async (req: Request, res: Response,next:NextFunction)=>{
    try {
        Result(res,req.user);
    } catch (error) {
        next(error);
    }
};

export const logoutController = async (req: Request, res: Response,next:NextFunction) =>{
    try{
        res.clearCookie("jwt",{ maxAge:0 });
        Result(res,"logout success");
    }
    catch (error){
        next(error);
    }
};

export const updateInfoController = async (req: Request, res: Response,next:NextFunction) =>{
    try{
        const user = req.user;

        const repository = getManager().getRepository(Users);

        await repository.update(user.id,req.body);

        const updatedUser = await repository.findOne({ where:{ id:user.id } }) as Users;


        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const { password, ...data } = updatedUser;

        Result(res,data);
    }
    catch (error){
        next(error);
    }
};

export const updatePasswordController = async (req: Request, res: Response,next:NextFunction) =>{
    try{
        const user = req.user;
        if(req.body.password!==req.body.password_confirm){
            throw errorHandle("Password's do not match");
        }
        const repository = getManager().getRepository(Users);

        await repository.update(user.id,{
            password:await hashPassword(req.body.password)
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const { password,...data } = user;
        Result(res,data);
    }
    catch (error){
        next(error);
    }
};