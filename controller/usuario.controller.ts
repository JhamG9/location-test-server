import { Request, Response } from "express";

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