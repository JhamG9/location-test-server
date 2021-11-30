import { DataTypes } from "sequelize";
import db from "../db/conection";


const Location = db.define('location', {
    lat: {
        type: DataTypes.STRING
    },
    lng: {
        type: DataTypes.STRING
    }
});

export default Location;

