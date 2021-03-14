import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import apiRoutes from "./routes/index.routes";
import db from "./database/connection";
class Server {
  public app: Application;
  constructor() {
    // Express
    this.app = express();
    this.dbConnection();
    this.config();
    this.routes();
  }
  config(): void {
    // Configurar el .env
    dotenv.config();
    // Configurar el puerto
    this.app.set("port", process.env.PORT || 3000);
    //this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    //Public
  }
  async dbConnection() {
    try {
      await db.authenticate();
      console.log("Database online");
    } catch (error) {
      throw new Error(error);
    }
  }
  // Rutas
  routes(): void {
    this.app.use("/api", apiRoutes);
  }
  // Iniciar el server
  start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("Server on Port", this.app.get("port"));
    });
  }
}
const server: Server = new Server();
server.start();
