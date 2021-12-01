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
const getLocations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const locations = yield location_1.default.findAll().catch(err => console.error(err));
    res.json(locations);
});
exports.getLocations = getLocations;
const postLocation = (req, res) => {
    var _a;
    let csvData = [];
    fs_1.default.createReadStream(__dirname + '/../../uploads/' + ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename))
        .pipe((0, csv_parser_1.default)()).on('data', (row) => {
        csvData.push(row);
    }).on('end', function () {
        var result = [];
        for (var i = 0; i < csvData.length; i++) {
            if (i % 1000 == 0)
                result.push([]);
            result[Math.floor(i / 1000)].push(csvData[i]);
        }
        result.forEach((item) => {
            insertLocation(item);
        });
        res.json({
            msg: 'Ubicaciones ingresadas correctamente',
            data: null
        });
    });
};
exports.postLocation = postLocation;
const insertLocation = (locations) => {
    const locationInsert = location_1.default.bulkCreate(locations);
};
//# sourceMappingURL=location.controller.js.map