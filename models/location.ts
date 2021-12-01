import { DataTypes } from "sequelize";
import db from "../db/conection";


const Location = db.define('location', {
    lat: {
        type: DataTypes.STRING
    },
    lon: {
        type: DataTypes.STRING
    }
});

export default Location;

