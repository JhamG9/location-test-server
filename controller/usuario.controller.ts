import { Request, Response } from "express";

export const getUsers = (req: Request, res: Response) => {
    res.json({
        msg: 'getUsuarios'
    })
}

/**
 * Method insert the data in DB of csv file
 * @param data array of csv
 */
export const insertLatLng = (data:Array<[]>) => {
    
    console.log("Insert latlng", data);

}