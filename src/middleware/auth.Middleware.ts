import { errorHandle,decodeToken } from "@utils/index";
import { Request, Response, NextFunction } from "express";
import { Users } from "@entity/index";
import { getManager } from "typeorm";

export const authMiddleware = async (req:Request,res:Response,next:NextFunction) => {
    try {


        const { jwt } = req.cookies;

        if(!jwt){
            throw errorHandle("unauthenticated",401);
        }
        const payload:any = await decodeToken(jwt);

        if(!payload) {
            throw errorHandle("unauthenticated",401);
        }

        const repository = getManager().getRepository(Users);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const { password, ...user } = await repository.findOneBy({ id:payload._id }) as Users;

        req.user=user;
        // const token = req.headers.authorization?.split(" ")[1];

        // if (!token) {
        //     throw errorHandle("Please sigin",401);
        // }

        // const decode = await jwt.verify(token,String(process.env.JWT_ACCESS_SECRET));
        // req.user = decode;

        next();
    } catch (error) {
        next(error);
    }
};