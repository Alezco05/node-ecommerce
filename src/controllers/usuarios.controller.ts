import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Usuario from "../models/Usuario";

export class UsuariosController {
  public static async getUsuarios(req: Request, resp: Response) {
    const usuarios = await Usuario.findAll();
    resp.json({ usuarios });
  }
  public static async getUsuario(req: Request, resp: Response) {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      resp.json(usuario);
    } else {
      resp.status(404).json({
        msg: `No existe un usuario con el id ${id}`,
      });
    }
  }
  public static async postUsuario(req: Request, resp: Response) {
    const { body } = req;
    try {
      const email = await Usuario.findOne({
        where: { email: body.email },
      });
      if (email) {
        return resp
          .status(400)
          .json({ msg: "Ya existe un usuario con el email " + body.email });
      }
      const usuario: any = await Usuario.create(body);
      let { password } = body;
      const salt = bcrypt.genSaltSync();
      usuario.password = bcrypt.hashSync(password, salt);
      await usuario.save();
      resp.json(usuario);
    } catch (error) {
      console.log(error);
      resp.status(500).json({
        msg: "Hable con el administrador",
      });
    }
  }
  public static putUsuario(req: Request, resp: Response) {
    const { id } = req.params;
    const { body } = req;
    resp.json({
      msg: "Put Usuario",
      body,
      id,
    });
  }
  public static deleteUsuario(req: Request, resp: Response) {
    const { id } = req.params;
    resp.json({
      msg: "Delete Usuario",
      id,
    });
  }
}
