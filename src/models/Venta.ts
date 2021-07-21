import { DataTypes } from "sequelize";
import db from "../database/connection";
import Usuario from "./Usuario";

const Ventas = db.define("ventas", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: formatDate(new Date()),
  },
  usuario_id: {
    type: DataTypes.INTEGER,
  },
  neto: {
    type: DataTypes.DECIMAL,
  },
  iva: {
    type: DataTypes.DECIMAL,
  },
  total: {
    type: DataTypes.DECIMAL,
    defaultValue: 0.0,
  },
});

function formatDate(date) {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
Ventas.hasMany(Usuario, {
  foreignKey: "id",
});
export default Ventas;
