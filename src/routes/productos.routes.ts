import { Router } from "express";

import { ProductosController } from "../controllers/productos.controller";

class ProductosRoutes {
  router: Router = Router();
  constructor() {
    this.config();
  }
  config() {
    this.router.get("/", ProductosController.getProductos);
    this.router.get("/:id", ProductosController.getProducto);
    this.router.post("/", ProductosController.postProducto);
    this.router.put("/:id", ProductosController.putProducto);
    this.router.delete("/:id", ProductosController.deleteProducto);
  }
}

export default new ProductosRoutes().router;
