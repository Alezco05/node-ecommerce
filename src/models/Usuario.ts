import { DataTypes } from "sequelize";
import db from "../database/connection";

import bcrypt from "bcryptjs";
/* 
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
},);

export default Usuario;
 */
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
 },
 {
  hooks: {
   beforeCreate: async (user: any) => {
    if (user.password) {
     const salt = await bcrypt.genSaltSync(10);
     user.password = bcrypt.hashSync(user.password, salt);
    }
   },
   beforeUpdate:async (user: any) => {
    if (user.password) {
     const salt = await bcrypt.genSaltSync(10);
     user.password = bcrypt.hashSync(user.password, salt);
    }
   }
  },
 });
 
export default Usuario;
 