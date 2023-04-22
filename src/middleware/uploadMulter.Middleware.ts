import multer from "multer";
import { extname } from "path";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/public/images");
    },
    filename: (req, file, cb) => {
        const randomName = Math.random().toString(20).substring(2,12);
        cb(null, randomName+extname(file.originalname));
    }
});

const upload = multer({ storage });

export { upload as upLoadImages };