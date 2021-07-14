import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export class Helper {
  public static generarJWT(uid: string) {
    return new Promise((resolve, reject) => {
      const payload = {
        uid,
      };
      const env: string = process.env["JWT_SECRET"] as string;
      jwt.sign(
        payload,
        env,
        {
          expiresIn: "12h",
        },
        (err: any, token: any) => {
          if (err) {
            console.log(err);
            reject("No se pudo generar el JWT");
          } else {
            resolve(token);
          }
        }
      );
    });
  }
  public static showMessage(
    res: Response,
    status: number = 200,
    ok: boolean = true,
    msg: string
  ) {
    return res.status(status).json({
      ok,
      msg,
    });
  }
}
