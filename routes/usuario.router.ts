import { Router } from "express";
import { getLocations, postLocation } from "../controller/location.controller";
import multer from "multer";
import mimeTypes from "mime-types";


const storage = multer.diskStorage({
    destination: 'uploads',
    filename: function (req, file, callback) {
        const fileName = Date.now() + file.originalname + '.' + mimeTypes.extension(file.mimetype);
        callback(null, fileName);
    }
});

const upload = multer({
    storage: storage
});

const router = Router();

router.get('/', getLocations);
router.post('/location', upload.single('avatar'), postLocation);

export default router;