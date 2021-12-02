import { Sequelize } from "sequelize";

const db = new Sequelize('locations', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});


export default db;