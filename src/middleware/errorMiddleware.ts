import { Request, Response, NextFunction } from "express";
import { CustomError } from "@interface/customError";
export const errorMiddleware = (
    err: CustomError,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
) => {
    const status = err.status || 400;
    res.status(status).json({
        message: err.message,
        status: status,
    });
};
