import { Request, Response } from "express";
const readXlsxFile = require("read-excel-file/node");

export const getUsers = (req: Request, res: Response) => {
    req.params

    res.json({
        msg: 'getUsuarios'
    })
}

/**
 * Method insert the data from excel
 * @param req request
 * @param res response
 */
export const postUsuario = (req: any, res: Response) => {
    const { body } = req;

    try {
        console.log(req.files);
        if (req.files == undefined) {
            return res.status(400).send("Please upload an excel file!");
        }

        let path =
            __dirname + "/resources/static/assets/uploads/" + req.file.filename;

            readXlsxFile(path).then((rows:any) =>{
                rows.shift();
                console.log(rows);
            })

    } catch (error) {
        console.error(error);
        res.status(500).send({
            msg: 'Post usuairo',
            body
        })
    }

    res.json({
        msg: 'Post usuairo',
        body
    })
}