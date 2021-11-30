import { Router } from "express";
import { getUsers, insertLatLng } from "../controller/usuario.controller";
import multer from "multer";
import mimeTypes from "mime-types";
import csv from "csv-parser";
import fs from "fs";

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: function (req, file, callback) {
        const fileName = Date.now() + file.originalname + '.' + mimeTypes.extension(file.mimetype);
        callback(null, fileName);

        let csvData: any = [];
        fs.createReadStream(__dirname + '/../../uploads/' + fileName)
            .pipe(csv()).on('data', (row) => {
                csvData.push(row);
            }).on('end', function () {
                insertLatLng(csvData);
            });
    }
});

const upload = multer({
    storage: storage
});

const router = Router();

router.get('/', getUsers);
router.post('/route', upload.single('avatar'));

export default router;