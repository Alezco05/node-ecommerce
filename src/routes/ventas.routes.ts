import { Router } from "express";

import { VentasController } from "../controllers/ventas.controller";

class ProductosRoutes {
  router: Router = Router();
  constructor() {
    this.config();
  }
  config() {
    this.router.get("/", VentasController.getVentas);
    this.router.get("/:id", VentasController.getVenta);
    this.router.post("/", VentasController.postVenta);
    this.router.put("/:id", VentasController.putVenta);
  }
}

export default new ProductosRoutes().router;
