import { Request, Response } from "express";
import Productos from "../models/Producto";
export class ProductosController {
  public static async getProductos(req: Request, resp: Response) {
    const usuarios = await Productos.findAll();
    resp.json({ usuarios });
  }
  public static async getProducto(req: Request, resp: Response) {
    const { id } = req.params;
    const producto: any = await Productos.findByPk(id);
    if (producto) {
      resp.json(producto);
    } else {
      resp.status(404).json({
        msg: `No existe un producto con el id ${id}`,
      });
    }
  }

  public static async postProducto(req: Request, resp: Response) {
    const { body } = req;
    try {
      const producto: any = await Productos.create(body);
      await producto.save();
      resp.json(producto); 
    } catch (error) {
      console.log(error);
      resp.status(500).json({
        msg: "Hable con el administrador",
      });
    }
  }
  public static async putProducto(req: Request, resp: Response) {
    const { id } = req.params;
    const { body } = req;
    try {
      const producto = await Productos.findByPk(id);
      if (!producto) {
        return resp.status(404).json({
          msg: "No existe un producto con el id " + id,
        });
      }
      await producto.update(body);
      resp.json(producto);
    } catch (error) {
      console.log(error);
      resp.status(500).json({
        msg: "Hable con el administrador",
      });
    }
  }
  public static async deleteProducto(req: Request, resp: Response) {
    const { id } = req.params;
    const producto = await Productos.findByPk(id);
    if (!producto) {
      return resp.status(404).json({
        msg: "No existe un producto con el id " + id,
      });
    }
    await producto.update({ estado: 0 });
    resp.json(producto);
  }
}
