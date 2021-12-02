import { Request, Response } from "express";

import csv from "csv-parser";
import fs from "fs";
import Location from "../models/location";
import Latlng from "../interfaces/Latlng";

/**
 * Method get locations
 * @param req Request
 * @param res Response
 * @query page number of page
 */
export const getLocations = async (req: Request, res: Response) => {
    // Initial variables pagination
    const { query } = req;
    let pagination = 10;
    let page = 1;

    if (query.page) {
        page = +query.page;
    }

    const locations = await Location.findAll({
        offset: page * pagination,
        limit: pagination
    }).catch(err => console.error(err))

    res.json(locations);
}

/**
 * Method insert the locations of file csv
 * @param req Request
 * @param res Response
 */
export const postLocation = (req: Request, res: Response) => {
    let csvData: Latlng[] = [];
    let csvError: Latlng[] = [];

    fs.createReadStream(__dirname + '/../../uploads/' + req.file?.filename)
        .pipe(csv()).on('data', (row) => {
            if (+row.lat >= -90 && +row.lat <= 90 && +row.lon >= -180 && +row.lon <= 180) {
                csvData.push(row);
            } else {
                csvError.push(row);
            }
        }).on('end', function () {
            //  group by 1000 objects
            let resultArrayGroup: any = [];
            for (var i = 0; i < csvData.length; i++) {
                if (i % 1000 == 0) resultArrayGroup.push([]);
                resultArrayGroup[Math.floor(i / 1000)].push(csvData[i]);
            }

            // run arrayGroup and insert locations
            resultArrayGroup.forEach(async (item: any) => {
                await insertLocation(item);
            });


            if (csvError.length >= 1) {
                return res.status(202).json({
                    msg: 'Ubicaciones ingresadas correctamente, pero tenemos fechas invalidas',
                    data: null,
                    error: csvError
                });
            }

            return res.json({
                msg: 'Ubicaciones ingresadas correctamente',
                data: null
            });
        });
}

/**
 * Method insert locations by an array
 * @param locations Array of locations
 * @returns Promise insert locations
 */
const insertLocation = (locations: any) => {
    return Location.bulkCreate(locations);
}
