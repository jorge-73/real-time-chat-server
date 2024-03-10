import logger from "./logger.js";
import mongoose from "mongoose";
import { MONGO_URL, MONGO_DB_NAME } from "../config/config.js";

export const connectDataBase = async () => {
  try {
    mongoose.connect(`${MONGO_URL}${MONGO_DB_NAME}`);
    logger.info(">>> DB is connected");
  } catch (error) {
    logger.error(`Cannot connect to dataBase: ${error}`);
    process.exit();
  }
};
