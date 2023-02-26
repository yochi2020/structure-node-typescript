import dotenv from "dotenv";
import app from "./server";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

app.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`server is runing on port ${process.env.PORT}`);
});
