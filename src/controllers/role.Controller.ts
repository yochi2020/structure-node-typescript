import { Request, Response,NextFunction } from "express";
import { Result } from "@utils/index";
import { getRepository } from "typeorm";
import { Role } from "@entity/index";

export const getRoleController = async (req: Request, res: Response,next:NextFunction) =>{
    try{
        const repository = getRepository(Role);
        Result(res,await repository.findOne({ where:{ id:Number(req.params.id) },relations:["permissions"] }));
    }
    catch (error){
        next(error);
    }
};

export const createRoleController = async (req: Request, res: Response,next:NextFunction) =>{
    try{
        const { name ,permissions } = req.body;
        const repository = getRepository(Role);

        const role = await repository.save({
            name,
            permissions:permissions.map(id=>({ id })),
        });
        Result(res,role);
    }
    catch (error){
        next(error);
    }
};

export const updateRoleController = async (req: Request, res: Response,next:NextFunction) =>{
    try{
        const repository = getRepository(Role);

        // const role = await repository.save({
        //     id:parseInt()
        // });
        Result(res,"");
    }
    catch (error){
        next(error);
    }
};

export const deleteRoleController = async (req: Request, res: Response,next:NextFunction) =>{
    try{

        Result(res,"");
    }
    catch (error){
        next(error);
    }
};