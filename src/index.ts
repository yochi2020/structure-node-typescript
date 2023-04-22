
import fs from "fs";
import path from "path";
import app from "./server";
import { createConnection } from "typeorm";
const watchAndUpdateIndex = (targetFolder:string[]) => {
    targetFolder.forEach(data => {
        const folderPaths = path.join(__dirname, `./${data}`);

        // watch in folder
        fs.watch(folderPaths, (eventType) => {
            const fileInFolder = fs.readdirSync(folderPaths);
            if (eventType === "rename") {
                const model:any =[];
                fileInFolder.forEach((file:string) => {
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

createConnection().then(() => {
    app.listen(process.env.PORT, async () => {
        // eslint-disable-next-line no-console
        console.log(`server is runing on port ${process.env.PORT}`);
        watchAndUpdateIndex(["utils","controllers","entity","middleware"]);
    });
// eslint-disable-next-line no-console
}).catch(err => console.log(err));

