import { DataTypes } from "sequelize";
import db from "../database/connection";

const Usuario = db.define("usuarios", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  estado: {
    type: DataTypes.BOOLEAN,
  },
  password: {
    type: DataTypes.STRING,
  },
});

export default Usuario;
