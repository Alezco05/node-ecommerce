import { NextFunction, Request, Response } from "express";

import { validationResult } from "express-validator";

export default function validarCampos(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Leer el Token
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({
      ok: false,
      errores: errors.mapped(),
    });
  next();
}
