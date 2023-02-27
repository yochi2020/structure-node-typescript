import { encryptPassword,checkPassword } from "@common/index";
import mongoose from "mongoose";

export interface IUser {
    firstname:string
    lastname:string
    email:string
    mobile:string
    password: string
    role:string
}
export interface IUserModel extends IUser, Document{
    isPasswordMatched:(password:string)=>Promise<any>
}

const userSchema = new mongoose.Schema ({
    firstname: {
        type: String,
        reqired: true,
        unique: true,
        index: true,
    },
    lastname:{
        type: String,
        reqired: true,
        unique: true,
        index: true,
    },
    email: {
        type: String,
        reqired: true,
        unique: true,
    },
    mobile: {
        type: String,
        reqired: true,
        unique: true,
    },
    password: {
        type: String,
        reqired: true,
    },
    role: {
        type: String,
        default:"user"
    },
    cart: {
        type: Array,
        default:[]
    },
    address: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Address"
        }]
    },
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }]
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    const salt = await encryptPassword(String(this.password));
    this.password = salt;
    next();
});

userSchema.methods = {
    isPasswordMatched:async function(enteredPassword:string){
        return await checkPassword(enteredPassword,this.password);
    }
};

export const UserModel=  mongoose.model<IUserModel>("user", userSchema);