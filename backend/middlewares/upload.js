import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Resolve _dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename:(req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});


// File Filter (Allow Only Images)
const fileFilter = (req, file, cb) => {
    const allowTypes = /jpg|jpe|png/;
    const extName = allowTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowTypes.test(file.mimetype);

    if(extName && mimeType){
        return cb(null, true);
    } else {
        return cb(new Error("Only JPEG, JPG, and PNG files are allowed"));
    }
};

// Multer instance 
const upload = multer({
    storage,
    limits: {fileSize: 5 * 1024 * 1024}, // Max 5MB
    fileFilter,
})

export default upload;