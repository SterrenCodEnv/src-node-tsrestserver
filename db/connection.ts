import { Sequelize } from 'sequelize';
const db = new Sequelize('crs-node', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

export default db;