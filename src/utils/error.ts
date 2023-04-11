import { CustomError } from "@interface/customError";

export const errorHandle = (message:string,status=400) => {
    const error: CustomError = new Error(message);
    error.status = status;
    return error;
};

