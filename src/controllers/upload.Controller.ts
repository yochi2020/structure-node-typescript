import { Request, Response,NextFunction } from "express";
import { Result } from "@utils/index";

export const uploadController = async (req: Request, res: Response,next:NextFunction) =>{
    try{

        Result(res,{
            url:`http://localhost:${process.env.PORT}/api/uploads/images/${req.file?.filename}`
        });
    }
    catch (error){
        next(error);
    }
};
