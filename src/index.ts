import app from "./server";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
const watchAndUpdateIndex = (targetFolder:string[])=>{
    targetFolder.forEach(data => {
        const folderPaths = path.join(__dirname, `./${data}`);

        // watch in folder
        fs.watch(folderPaths, (eventType) => {
            const fileInFolder = fs.readdirSync(folderPaths);
            if (eventType === "rename") {
                const model:any =[];
                fileInFolder.forEach((file:string)=>{
                    if(file==="index.ts"){
                        return;
                    }
                    const modelFile = file.split(".ts")[0];
                    const changeName = `export * from "./${modelFile}";\n`;
                    model.push(changeName);
                });
                // write file in folder  asynchronous
                fs.writeFileSync(__dirname+"/"+data+"/index.ts", model.join(""),{ flag: "w" });
            }
        });
    });
};

watchAndUpdateIndex(["utils"]);

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
