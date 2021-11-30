import express, { Application } from "express";
import userRoutes from "../routes/usuario.router";
import cors from 'cors';

import db from "../db/conection";

export class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        // Initial methods
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection(){
        try {
            await db.authenticate();
            console.log("Database online");
        } catch (error:any) {
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
        this.app.use(this.apiPaths.usuarios, userRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        });
    }
}

export default Server;
