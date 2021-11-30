import { Request, Response } from "express";
import Location from "../models/location";

export const getLocations = async (req: Request, res: Response) => {
    const locations = await Location.findAll().catch(err => console.error(err))
    res.json(locations);
}

/**
 * Method insert the data in DB of csv file
 * @param data array of csv
 */
export const insertLatLng = (data: Array<[]>) => {

    console.log("Insert latlng", data);

}