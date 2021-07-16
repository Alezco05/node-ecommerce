import { DataTypes } from "sequelize";
import db from "../database/connection";

const Productos = db.define("productos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
  },
  descripcion: {
    type: DataTypes.STRING,
  },
  estado: {
    type: DataTypes.TINYINT,
  },
  precio: {
    type: DataTypes.DECIMAL,
  },
 });
 
export default Productos;
 