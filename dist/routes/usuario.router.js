"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controller_1 = require("../controller/usuario.controller");
const multer_1 = __importDefault(require("multer"));
const mime_types_1 = __importDefault(require("mime-types"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: 'uploads',
    filename: function (req, file, callback) {
        const fileName = Date.now() + file.originalname + '.' + mime_types_1.default.extension(file.mimetype);
        callback(null, fileName);
        let csvData = [];
        fs_1.default.createReadStream(__dirname + '/../../uploads/' + fileName)
            .pipe((0, csv_parser_1.default)()).on('data', (row) => {
            csvData.push(row);
        }).on('end', function () {
            (0, usuario_controller_1.insertLatLng)(csvData);
        });
    }
});
const upload = (0, multer_1.default)({
    storage: storage
});
const router = (0, express_1.Router)();
router.get('/', usuario_controller_1.getUsers);
router.post('/route', upload.single('avatar'));
exports.default = router;
//# sourceMappingURL=usuario.router.js.map