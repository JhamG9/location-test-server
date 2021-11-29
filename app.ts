import dotenv from "dotenv";
import Server from "./models/server";

// Init .env
dotenv.config();

// Init server
const server = new Server();
server.listen();
