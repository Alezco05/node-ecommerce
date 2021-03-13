import { Sequelize } from 'sequelize';

// BASE DE DATOS, USUARIO, CONTRASEÑA
const db = new Sequelize('node', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false,
    define: {
        timestamps: false
    }
});


export default db;