import express, { Application } from "express";
import locationRoutes from "../routes/location.router";
import cors from 'cors';

import db from "../db/conection";

export class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        location: '/api/location'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        // Initial methods
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log("Database online");
        } catch (error: any) {
            throw new Error(error);
        }
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lecture Body
        this.app.use(express.json());

        // Public folder
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.apiPaths.location, locationRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        });
    }
}

export default Server;
