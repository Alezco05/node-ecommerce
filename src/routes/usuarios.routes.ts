import { Router } from "express";
import { check } from "express-validator";

import { UsuariosController } from "../controllers/usuarios.controller";
import validarCampos from "../middleware/validar-campo";

class UsuariosRoutes {
  router: Router = Router();
  constructor() {
    this.config();
  }
  config() {
    this.router.get("/", UsuariosController.getUsuarios);
    this.router.get(
      "/:id",
      [check("id", "El ID es obligatorio").not().isEmpty(), validarCampos],
      UsuariosController.getUsuario
    );
    this.router.post(
      "/",
      [
        check(["email", "password"], "El campo es obligatorio").not().isEmpty(),
        validarCampos,
      ],
      UsuariosController.postUsuario
    );
    this.router.put(
      "/:id",
      [check("id", "El ID es obligatorio").not().isEmpty(), validarCampos],
      UsuariosController.putUsuario
    );
    this.router.delete(
      "/:id",
      [check("id", "El ID es obligatorio").not().isEmpty(), validarCampos],
      UsuariosController.deleteUsuario
    );
  }
}

export default new UsuariosRoutes().router;
