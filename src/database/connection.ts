import { Sequelize } from "sequelize";
import path from "path";
import logger from "../logger.js";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(process.cwd(), "database.sqlite"),
  logging: false,
});

export default async function connection() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    logger.info("🌿 Conexão com a database SQLite estabelecida.");
  } catch (err: any) {
    logger.error("🍂 Erro ao estabelecer conexão com a database SQLite.");
    logger.error(err.message);
    process.exit();
  }
}

export { sequelize };