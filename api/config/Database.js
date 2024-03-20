import { Sequelize } from "sequelize";
import "dotenv/config";

const db = new Sequelize('web_organisasi', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

export default db;
