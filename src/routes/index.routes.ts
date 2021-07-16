import { Router } from "express";
import usuariosRoutes from "./usuarios.routes";
import productosRoutes from "./productos.routes";
import ventasRoutes from "./ventas.routes";

class ApiRoutes {
  router: Router = Router();
  routes = [
    {
      path: "usuarios",
    },
    {
      path: "items",
    },
    {
      path: "auth",
    },
    {
      path: "upload",
    },
  ];
  constructor() {
    this.router.use("/usuarios", usuariosRoutes);
    this.router.use("/productos", productosRoutes);
    this.router.use("/ventas", ventasRoutes);
    
    /* this.routes.forEach(async (route) => {
        const module = require(`./${route.path}.routes`);
        return this.router.use(`/${route.path}`, module);
    }); */
  }
}

export default new ApiRoutes().router;
