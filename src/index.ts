import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import apiRoutes from "./routes/index.routes";
import authRoutes from "./routes/auth.routes";
import db from "./database/connection";
import validarJWT from "./middleware/jwt-validation";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

class ServerApp {
  public app: Application;
  httpServer; 
  io: Server; 
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
    this.app.use("/auth", authRoutes);
    this.app.use("/api", validarJWT, apiRoutes);
  }
  // Iniciar el server
  start(): void {
    this.httpServer = createServer(this.app);
    this.io = new Server(this.httpServer);
    this.io.on("connection", (socket: Socket) => {
     console.log('Server')
    });
    this.httpServer.listen(this.app.get('port'), () => {
      console.log("Server on Port", this.app.get("port"));
    });
    /*  this.app.listen(this.app.get("port"), () => {
      console.log("Server on Port", this.app.get("port"));
    }); */
  }
}
const server: ServerApp = new ServerApp();
server.start();
