import { encryptPassword,checkPassword } from "@common/index";
import mongoose from "mongoose";
export interface IUser extends Document{
    username: string
    password: string
    descryptPassword(password:string):Promise<boolean>
}

// export interface IUserModel extends IUser, Document{

// }

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique:true
    },
    password: {
        type:String
    }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password =await encryptPassword(this.password as string);
    }
    next();
});

userSchema.methods = {
    descryptPassword:async function (password:string) {
        if (!password) return "";
        return  checkPassword(password,this.password);
    },
};

export default mongoose.model<IUser>("user",userSchema);