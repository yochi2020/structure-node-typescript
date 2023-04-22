import {  Users } from "@src/entity";
import { errorHandle } from "@src/utils";
import { Request, Response, NextFunction } from "express";

export enum permissions {
    users="users",
    roles="roles"
}
export const permissionMiddleware =  (access:permissions) => {
    return (req:Request,res:Response,next:NextFunction)=>{
        try {
            const user:Users = req.user;
            const permissions:any = user.role.permissions;


            if(req.method==="GET"){
                if(!permissions.some(p=>(p.name===`view_${access}`) || (p.name===`edit_${access}`))){
                    throw errorHandle("unauthorized",401);
                }
            }else{
                if(!permissions.some(p=>p.name===`edit_${access}`)){
                    throw errorHandle("unauthorized",401);
                }
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};