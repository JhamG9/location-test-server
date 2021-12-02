"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLocation = exports.getLocations = void 0;
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
const location_1 = __importDefault(require("../models/location"));
/**
 * Method get locations
 * @param req Request
 * @param res Response
 * @query page number of page
 */
const getLocations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Initial variables pagination
    const { query } = req;
    let pagination = 10;
    let page = 1;
    if (query.page) {
        page = +query.page;
    }
    const locations = yield location_1.default.findAll({
        offset: page * pagination,
        limit: pagination
    }).catch(err => console.error(err));
    res.json(locations);
});
exports.getLocations = getLocations;
/**
 * Method insert the locations of file csv
 * @param req Request
 * @param res Response
 */
const postLocation = (req, res) => {
    var _a;
    let csvData = [];
    let csvError = [];
    fs_1.default.createReadStream(__dirname + '/../../uploads/' + ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename))
        .pipe((0, csv_parser_1.default)()).on('data', (row) => {
        if (+row.lat >= -90 && +row.lat <= 90 && +row.lon >= -180 && +row.lon <= 180) {
            csvData.push(row);
        }
        else {
            csvError.push(row);
        }
    }).on('end', function () {
        //  group by 1000 objects
        let resultArrayGroup = [];
        for (var i = 0; i < csvData.length; i++) {
            if (i % 1000 == 0)
                resultArrayGroup.push([]);
            resultArrayGroup[Math.floor(i / 1000)].push(csvData[i]);
        }
        // run arrayGroup and insert locations
        resultArrayGroup.forEach((item) => __awaiter(this, void 0, void 0, function* () {
            yield insertLocation(item);
        }));
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
};
exports.postLocation = postLocation;
/**
 * Method insert locations by an array
 * @param locations Array of locations
 * @returns Promise insert locations
 */
const insertLocation = (locations) => {
    return location_1.default.bulkCreate(locations);
};
//# sourceMappingURL=location.controller.js.map