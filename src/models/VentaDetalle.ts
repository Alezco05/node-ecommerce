import { DataTypes } from "sequelize";
import db from "../database/connection";
import Usuario from "./Usuario";
import Ventas from "./Venta";

const VentasDetalle = db.define("ventas_detalle", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ventas_id: {
    type: DataTypes.INTEGER,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
  },
  cantidad: {
    type: DataTypes.DECIMAL,
    defaultValue: 0.0,
  },
  precio: {
    type: DataTypes.DECIMAL,
    defaultValue: 0.0,
  },
  total: {
    type: DataTypes.DECIMAL,
    defaultValue: 0.0,
  },
});

VentasDetalle.hasMany(Ventas, {
  foreignKey: "id",
});
VentasDetalle.hasMany(Usuario, {
  foreignKey: "id",
});
export default VentasDetalle;
