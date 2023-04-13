import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//เข้ารหัส
export const hashPassword= async (password:string)=>{
    const salt =await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword =await  bcrypt.hash(password,salt);
    return hashPassword;
};

//ถอดรหัส
export const verifyPassword = async (password:string,passwordDB:string)=>{
    const isValid = await bcrypt.compare(password,passwordDB);
    return isValid;
};

export const generateAccessToken = async (userId:string | number) => {
    const token = jwt.sign(
        { _id: userId },
    process.env.JWT_ACCESS_SECRET as string,
    { expiresIn: "30m" }
    );
    return token;
};

export const generateRefreshToken = async (userId:string) => {
    const token = jwt.sign(
        { _id: userId },
    process.env.JWT_REFRESH_TOKEN_SECRET as string,
    { expiresIn: "1d" }
    );
    return token;
};

export const decodeToken = async (token:string) => {
    const data = await jwt.verify(token,String(process.env.JWT_ACCESS_SECRET));
    return data;
};