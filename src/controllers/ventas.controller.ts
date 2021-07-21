import { NextFunction, Request, Response } from "express";
import Ventas from "../models/Venta";
import VentasDetalle from "../models/VentaDetalle";
import { VentasDetallesController } from "./ventasDetalles.controller";
export class VentasController {
  public static async getVentas(req: Request, resp: Response) {
    const usuarios = await Ventas.findAll();
    resp.json({ usuarios });
  }
  public static async getVenta(req: Request, resp: Response) {
    const { id } = req.params;
    const venta: any = await Ventas.findByPk(id);
    if (venta) {
      resp.json(venta);
    } else {
      resp.status(404).json({
        msg: `No existe un venta con el id ${id}`,
      });
    }
  }

  public static async postVenta(req: any, resp: Response, next: NextFunction) {
    const { body } = req;
    try {
      const venta: any = await Ventas.create(body)
      body["ventas_id"] = venta.id;
      const ventaDetalle = await VentasDetalle.create(body);
      resp.json({ venta, ventaDetalle });
    } catch (error) {
      console.log(error);
      resp.status(500).json({
        error,
        msg: "Hable con el administrador",
      });
    }
  }
  public static async putVenta(req: Request, resp: Response) {
    const { id } = req.params;
    const { body } = req;
    try {
      const venta = await Ventas.findByPk(id);
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
