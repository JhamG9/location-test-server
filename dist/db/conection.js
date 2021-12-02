"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('locations', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});
exports.default = db;
//# sourceMappingURL=conection.js.map