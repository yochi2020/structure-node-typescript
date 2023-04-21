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
        Result(res,role,201);
    }
    catch (error){
        next(error);
    }
};

export const updateRoleController = async (req: Request, res: Response,next:NextFunction) =>{
    try{
        const { name,permissions } = req.body;
        const repository = getRepository(Role);

        const role = await repository.save({
            id:parseInt(req.params.id),
            name:name,
            permissions:permissions.map(id=>({ id }))
        });

        Result(res,role,202);
    }
    catch (error){
        next(error);
    }
};

export const deleteRoleController = async (req: Request, res: Response,next:NextFunction) =>{
    try{
        const repository = getRepository(Role);
        Result(res, await repository.delete(req.params.id),204);
    }
    catch (error){
        next(error);
    }
};