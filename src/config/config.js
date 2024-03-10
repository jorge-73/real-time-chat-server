import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3000;
export const ENVIRONMENT = process.env.ENVIRONMENT;
export const PRIVATE_KEY = process.env.PRIVATE_KEY;
export const SIGNED_COOKIE_KEY = process.env.SIGNED_COOKIE_KEY;
export const MONGO_URL = process.env.MONGO_URL;
export const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
export const NODE_ENV = process.env.NODE_ENV;
