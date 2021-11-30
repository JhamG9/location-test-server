"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const conection_1 = __importDefault(require("../db/conection"));
const Location = conection_1.default.define('location', {
    lat: {
        type: sequelize_1.DataTypes.STRING
    },
    lng: {
        type: sequelize_1.DataTypes.STRING
    }
});
exports.default = Location;
//# sourceMappingURL=location.js.map