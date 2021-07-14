import { Router } from "express";

import { AuthController } from "../controllers/auth.controller";

class UsuariosRoutes {
  router: Router = Router();
  constructor() {
    this.config();
  }
  config() {
    this.router.post("/signUp", AuthController.signUp);
    this.router.post("/signIn", AuthController.signIn);
    this.router.post("/renewToken", AuthController.renewToken);
}
}

export default new UsuariosRoutes().router;
