import { errorHandle, sendEmailWithNodeMail, IEmailData, Result } from "@common/index";
import { NextFunction, Request, Response } from "express";
import formidable from "formidable";
import fs from "fs";

export const demoOneController = (req: Request, res: Response) => {
    Result(res, "");
};

export const uploadMulterController = (req: Request, res: Response, next: NextFunction) => {
    try {
        // if(!req.files) throw errorHandle("image are required");
        // // let images;
        // if (typeof req.files === "object") {
        //     // images = req.files ? [...req.files] :[];
        // }
        Result(res, "req");
    } catch (error) {
        next(error);
    }
};

export const uploadFormidableController = (req: Request, res: Response, next: NextFunction) => {
    try {
        const form = new formidable.IncomingForm({
            multiples: true,   // อัพโหลดได้หลายภาพ
            maxFileSize: 50 * 1024 * 1024, // 5MB
            uploadDir: "src/public/images",  //ที่เก็บไฟล์
            keepExtensions: true    //อัพโหลดแล้วมีนามสกุล
        });
        form.parse(req, (err: any, fields: any, files: any) => {
            if (err || !files.file) {
                return next(errorHandle("Invalid file"));
            }
            Result(res, fs.readFileSync(files.file.filepath), 200, "image/jpeg");
        });

    } catch (error) {
        next(error);
    }
};


export const sendEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, name, message } = req.body;
        const emailData: IEmailData = {
            to: "yochi.suz@gmail.com",
            from: email,
            subject: "",
            text: `Email received contact from \n Sender name :${name} Sender email ${email} Sender message ${message}}`,
            html: `
            <h4>Email recived from contact form:</h4>
            <p>Sender name ${name}</p>
            <p>Sender email ${email}</p>
            <p>Sender message ${message}</p>
        `
        };
        const result = await sendEmailWithNodeMail(emailData);
        Result(res, result);
    } catch (error) {
        next(error);
    }
};