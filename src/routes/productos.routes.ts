import { Router } from "express";
import { check } from "express-validator";

import { ProductosController } from "../controllers/productos.controller";
import validarCampos from "../middleware/validar-campo";

class ProductosRoutes {
  router: Router = Router();
  constructor() {
    this.config();
  }
  config() {
    this.router.get("/", ProductosController.getProductos);
    this.router.get(
      "/:id",
      [check("id", "El ID es obligatorio").not().isEmpty(), validarCampos],
      ProductosController.getProducto
    );
    this.router.post("/", validarCampos, ProductosController.postProducto);
    this.router.put(
      "/:id",
      [check("id", "El ID es obligatorio").not().isEmpty(), validarCampos],
      validarCampos,
      ProductosController.putProducto
    );
    this.router.delete(
      "/:id",
      [check("id", "El ID es obligatorio").not().isEmpty(), validarCampos],
      ProductosController.deleteProducto
    );
  }
}

export default new ProductosRoutes().router;
