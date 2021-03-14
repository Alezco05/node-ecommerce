import { Router } from "express";
import usuariosRoutes from "./usuarios.routes";

class ApiRoutes {
  router: Router = Router();
  constructor() {
    this.router.use("/usuarios", usuariosRoutes);
  }
}

export default new ApiRoutes().router;
