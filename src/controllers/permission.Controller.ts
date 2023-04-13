import { Request, Response,NextFunction } from "express";
import { Result } from "@utils/index";
import { getRepository } from "typeorm";
import { Permission } from "@entity/index";

export const permissionsController = async (req: Request, res: Response,next:NextFunction) =>{
    try{
        const repository = getRepository(Permission);
        Result(res,await repository.find());
    }
    catch (error){
        next(error);
    }
};