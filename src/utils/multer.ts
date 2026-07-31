import multer from 'multer';
import fs from 'fs';
import { Request } from 'express';

const regexPattern = /\.(jpg|JPG|webp|jpeg|JPEG|png|PNG|gif|GIF|jfif|JFIF|pdf|PDF|doc|docx|DOC|DOCX|csv|CSV)$/;

type UploadRequest = Request & {
    fileValidationError?: string;
};

const filterImageOrDocsOrPDF = (req: UploadRequest, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (!file.originalname.match(regexPattern)) {
        req.fileValidationError = 'file type not allowed';
        return cb(null, false);
    }

    cb(null, true);
};

export const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            const path = `/tmp/`;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, { recursive: true });
            }
            cb(null, path);
        },
        filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + '.' + file.originalname.split('.').pop());
        }
    }),
    limits: { fileSize: 10 * 1024 * 1024 },  // max 10MB //
    fileFilter: filterImageOrDocsOrPDF
});

export const fileUploader = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadPath = `uploads/`;
            fs.mkdirSync(uploadPath, { recursive: true });
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + '.' + file.originalname.split('.').pop());
        },
    }),
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: filterImageOrDocsOrPDF
});
