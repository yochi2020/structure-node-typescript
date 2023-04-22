import { Request, Response,NextFunction } from "express";
import { Result, hashPassword } from "@utils/index";
import { getRepository } from "typeorm";
import { Users } from "@entity/index";


export const usersController=async (req: Request, res: Response,next:NextFunction) => {
    try{
        const take = 5;
        const page = parseInt(req.query.page as string ||
            "1");
        const repository = getRepository(Users);
        const [data,total] = await repository.findAndCount({
            relations:["role"],
            take,
            skip:(page-1)*take
        });
        const user = data.map(u=>{
            // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
            const { password,...data } = u;
            return data;
        });
        Result(res,{
            data:user,
            meta:{
                total,
                page,
                lastPage:Math.ceil(total/take)
            }
        });
    }
    catch (error){
        next(error);
    }
};

export const createUserController = async (req: Request, res: Response,next:NextFunction) => {
    try{
        const { role_id:roleId,...body } = req.body;
        const repository = getRepository(Users);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const { password,...user } = await repository.save({
            ...body,
            password:await hashPassword(body.password),
            role:{
                id:roleId
            }
        });
        Result(res,user);
    }
    catch (error){
        next(error);
    }
};

export const getUserController = async (req: Request, res: Response,next:NextFunction) => {
    try{
        const repository = getRepository(Users);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const { password , ...user } =await repository.findOne({ where:{ id: Number(req.params.id) },relations:["role"] }) as Users;
        Result(res,user);
    }
    catch (error){
        next(error);
    }
};

export const updateUserController = async (req: Request, res: Response,next:NextFunction) => {
    try{
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const { role_id:roleId,...body } = req.body;

        const repository = getRepository(Users);
        await repository.update(req.params.id,{ role:{ id:roleId } });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const { password , ...user } =await repository.findOne({ where:{ id: Number(req.params.id) } }) as Users;
        Result(res,user,202);
    }
    catch (error){
        next(error);
    }
};

export const deleteUserControloler = async (req: Request, res: Response,next:NextFunction) => {
    try{
        const repository = getRepository(Users);
        await repository.delete(req.params.id);
        Result(res,null,204);
    }
    catch (error){
        next(error);
    }
};