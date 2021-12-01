import { Request, response, Response } from "express";

import csv from "csv-parser";
import fs from "fs";
import Latlng from "../interfaces/Latlng";
import Location from "../models/location";

export const getLocations = async (req: Request, res: Response) => {
    const locations = await Location.findAll().catch(err => console.error(err))
    res.json(locations);
}

export const postLocation = (req: Request, res: Response) => {
    let csvData: any[] = [];
    fs.createReadStream(__dirname + '/../../uploads/' + req.file?.filename)
        .pipe(csv()).on('data', (row) => {
            csvData.push(row);
        }).on('end', function () {
            var result: any = [];
            
            for (var i = 0; i < csvData.length; i++) {
                if (i % 1000 == 0) result.push([]);
                result[Math.floor(i / 1000)].push(csvData[i]);
            }

            result.forEach((item:any) => {
                insertLocation(item);
            });

            res.json({
                msg: 'Ubicaciones ingresadas correctamente',
                data: null
            });
        });
}

const insertLocation = (locations: any) => {
    const locationInsert = Location.bulkCreate(locations);
}
