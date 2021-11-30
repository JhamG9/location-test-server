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
exports.insertLatLng = exports.getLocations = void 0;
const location_1 = __importDefault(require("../models/location"));
const getLocations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const locations = yield location_1.default.findAll().catch(err => console.error(err));
    res.json(locations);
});
exports.getLocations = getLocations;
/**
 * Method insert the data in DB of csv file
 * @param data array of csv
 */
const insertLatLng = (data) => {
    console.log("Insert latlng", data);
};
exports.insertLatLng = insertLatLng;
//# sourceMappingURL=location.controller.js.map