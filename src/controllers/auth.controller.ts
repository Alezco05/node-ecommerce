import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Usuario from "../models/Usuario";
import { Helper } from "../helpers/jwt";
export interface IGetUserAuthInfoRequest extends Request {
    user: string // or any other type
  }
  
export class AuthController {
  

  public static async signUp(req: Request, resp: Response) {
    
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
      Usuario.beforeCreate(function(user, options) {
        let { password } = body;
        const salt = bcrypt.genSaltSync();
        usuario.password =  bcrypt.hashSync(password, salt);
      });
      await usuario.save();
      const token = await Helper.generarJWT(usuario.id);
      resp.json({ usuario, token });
    } catch (error) {
      console.log(error);
      resp.status(500).json({
        msg: "Hable con el administrador",
      });
    }
  }
  public static async signIn(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const usuarioDB: any = await Usuario.findOne({ where: {email} });
      if (!usuarioDB) {
        return res.status(404).json({
          ok: false,
          msg: "Email no encontrado",
        });
      }
      const validPassword = bcrypt.compareSync(password, usuarioDB.password);
      if (!validPassword) {
        return res.status(400).json({
          ok: false,
          msg: "Contraseña no válida",
        });
      }
      // Generar el TOKEN - JWT
      const token = await Helper.generarJWT(usuarioDB.id);
      res.json({
        ok: true,
        token,
        usuarioDB,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Hable con el administrador",
      });
    }
  }
  public static async renewToken(req: Request, res: Response) {
    const { id } = req.params;
    const token = Helper.generarJWT(id);
    const usuario = await Usuario.findOne({ where: {id} });
    res.json({
      ok: true,
      token,
      usuario,
    });
  }
}
