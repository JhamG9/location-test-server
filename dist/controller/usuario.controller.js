"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUsuario = exports.getUsers = void 0;
const readXlsxFile = require("read-excel-file/node");
const getUsers = (req, res) => {
    req.params;
    res.json({
        msg: 'getUsuarios'
    });
};
exports.getUsers = getUsers;
/**
 * Method insert the data from excel
 * @param req request
 * @param res response
 */
const postUsuario = (req, res) => {
    const { body } = req;
    try {
        console.log(req.files);
        if (req.files == undefined) {
            return res.status(400).send("Please upload an excel file!");
        }
        let path = __dirname + "/resources/static/assets/uploads/" + req.file.filename;
        readXlsxFile(path).then((rows) => {
            rows.shift();
            console.log(rows);
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({
            msg: 'Post usuairo',
            body
        });
    }
    res.json({
        msg: 'Post usuairo',
        body
    });
};
exports.postUsuario = postUsuario;
//# sourceMappingURL=usuario.controller.js.map