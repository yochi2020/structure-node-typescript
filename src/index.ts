import dotenv from "dotenv";
import app from "./server";
import mongoose from "mongoose";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

app.listen(process.env.PORT,async () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(String(process.env.MONGODB_URL)).then(() => {
        // eslint-disable-next-line no-console
        console.log(`server is runing on port ${process.env.PORT}`);
    }).catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
    });
});
