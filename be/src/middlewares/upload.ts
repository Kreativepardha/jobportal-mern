import multer from 'multer'
import path from 'path'
import fs from 'fs'

const UPLOADS_DIR = path.join(__dirname, "../uploads")
    
    if(!fs.existsSync(UPLOADS_DIR)) {
        fs.mkdirSync(UPLOADS_DIR, { recursive: true })
    }

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR)
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
})

export const upload = multer({
    storage, 
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "imge/png", "application/pdf"]
    
        if(!allowedTypes.includes(file.mimetype)) {
            return cb(new Error("Unsupported file type."), false);
        }
        cb(null, true)
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 mb max file size
    }
})