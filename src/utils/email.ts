import nodeMailer from "nodemailer";

export interface IEmailData  {
    to:string
    from:string
    subject:string
    text:string
    html:string
}

export const sendEmailWithNodeMail = (emailData: IEmailData) => {
    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: "yochi.suz@gmail.com", // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
            pass: "wgvtjowqwqyypipv", // MAKE SURE THIS PASSWORD IS YOUR GMAIL APP PASSWORD WHICH YOU GENERATED EARLIER
        },
        tls: {
            ciphers: "SSLv3",
        },
    });

    return transporter.sendMail(emailData);
};