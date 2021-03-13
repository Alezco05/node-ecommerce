import { Router } from 'express';

import {UsuariosController} from '../controllers/usuarios.controller';

class UsuariosRoutes {
    router: Router = Router();
    constructor() {
        this.config();
    }
    config() {
        this.router.get('/', UsuariosController.getUsuarios);
        this.router.get('/:id', UsuariosController.getUsuario);
        this.router.post('/', UsuariosController.postUsuario);
        this.router.put('/:id', UsuariosController.putUsuario);
        this.router.delete('/:id', UsuariosController.deleteUsuario);
    }
}

export default new UsuariosRoutes().router;

