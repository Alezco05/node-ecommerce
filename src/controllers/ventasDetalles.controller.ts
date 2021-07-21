import { NextFunction, Request, Response } from "express";
import VentasDetalle from "../models/VentaDetalle";
export class VentasDetallesController {
  public static async getVentas(req: Request, resp: Response) {
    const usuarios = await VentasDetalle.findAll();
    resp.json({ usuarios });
  }
  public static async getVenta(req: Request, resp: Response) {
    const { id } = req.params;
    const venta: any = await VentasDetalle.findByPk(id);
    if (venta) {
      resp.json(venta);
    } else {
      resp.status(404).json({
        msg: `No existe un venta con el id ${id}`,
      });
    }
  }

  public static async postVentaDetalle(req: any, resp: Response) {
    const { body } = req;
    try {
      const venta: any = await VentasDetalle.create(body);
      await venta.save();
      // resp.json(venta);
      return venta;
    } catch (error) {
      console.log(error);
      resp.status(500).json({
        msg: "Hable con el administrador",
      });
    }
  }
  public static async putVenta(req: Request, resp: Response) {
    const { id } = req.params;
    const { body } = req;
    try {
      const venta = await VentasDetalle.findByPk(id);
      if (!venta) {
        return resp.status(404).json({
          msg: "No existe un venta con el id " + id,
        });
      }
      await venta.update(body);
      resp.json(venta);
    } catch (error) {
      console.log(error);
      resp.status(500).json({
        msg: "Hable con el administrador",
      });
    }
  }
}
