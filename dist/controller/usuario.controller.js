"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertLatLng = exports.getUsers = void 0;
const getUsers = (req, res) => {
    res.json({
        msg: 'getUsuarios'
    });
};
exports.getUsers = getUsers;
/**
 * Method insert the data in DB of csv file
 * @param data array of csv
 */
const insertLatLng = (data) => {
    console.log("Insert latlng", data);
};
exports.insertLatLng = insertLatLng;
//# sourceMappingURL=usuario.controller.js.map