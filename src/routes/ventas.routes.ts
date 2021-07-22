import { Router } from "express";
import { check } from "express-validator";

import { VentasController } from "../controllers/ventas.controller";
import validarCampos from "../middleware/validar-campo";

class ProductosRoutes {
  router: Router = Router();
  constructor() {
    this.config();
  }
  config() {
    this.router.get("/", VentasController.getVentas);
    this.router.get(
      "/:id",
      [check("id", "El ID es obligatorio").not().isEmpty(), validarCampos],
      VentasController.getVenta
    );
    this.router.post(
      "/",
      [
        check(
          [
            "nombre",
            "date",
            "neto",
            "iva",
            "total",
            "cantidad",
            "precio",
            "usuario_id",
          ],
          "El campo es obligatorio"
        )
          .not()
          .isEmpty(),
        validarCampos,
      ],
      VentasController.postVenta
    );
    this.router.put(
      "/:id",
      [check("id", "El ID es obligatorio").not().isEmpty(), validarCampos],
      VentasController.putVenta
    );
  }
}

export default new ProductosRoutes().router;
