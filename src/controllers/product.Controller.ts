import { Request, Response,NextFunction } from "express";
import { getRepository } from "typeorm";
import { Product } from "@entity/index";
import { Result } from "@utils/index";

export const getProductsController=async (req: Request, res: Response,next:NextFunction) =>{
    try{
        const take = 5;
        const page = parseInt(req.query.page as string || "1");
        console.log("🚀 ~ file: product.Controller.ts:10 ~ getProductsController ~ page:", page);
        const repository = getRepository(Product);
        const [data,total] = await repository.findAndCount({
            take:take,
            skip:(page-1)*take
        });

        Result(res,{
            data,
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

export const getProductController = async (req: Request, res: Response,next:NextFunction) =>{
    try{
        const repository = getRepository(Product);

        const product = await repository.findOne({ where:{ id:Number(req.params.id) } });
        Result(res,product);
    }
    catch (error){
        next(error);
    }
};


export const createProductController = async (req: Request, res: Response,next:NextFunction) =>{
    try{
        const repository = getRepository(Product);

        const product = await repository.save(req.body);
        Result(res,product,201);
    }
    catch (error){
        next(error);
    }
};

export const updateProductController = async (req: Request, res: Response,next:NextFunction) =>{
    try{
        const repository = getRepository(Product);
        await repository.update(req.params.id,req.body);
        Result(res,await repository.findOne({ where:{ id:Number(req.params.id ) } }),202);
    }
    catch (error){
        next(error);
    }
};

export const deleteProductController = async (req: Request, res: Response,next:NextFunction) =>{
    try{
        const repository = getRepository(Product);
        await repository.delete(req.params.id);
        Result(res,"delete product success",204);
    }
    catch (error){
        next(error);
    }
};