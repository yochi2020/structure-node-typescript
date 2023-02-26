import bcrypt from "bcrypt";
//เข้ารหัส
export const encryptPassword= async (password:string)=>{
    const salt =await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword =await  bcrypt.hash(password,salt);
    return hashPassword;
};

//ถอดรหัส
export const checkPassword = async (password:string,passwordDB:string)=>{
    const isValid = await bcrypt.compare(password,passwordDB);
    return isValid;
};