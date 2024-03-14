import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PRIVATE_KEY, SIGNED_COOKIE_KEY, NODE_ENV } from "../config/config.js";

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (password, user) =>
  bcrypt.compareSync(password, user?.password || "");

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, PRIVATE_KEY, { expiresIn: "24h" });

  res.cookie(SIGNED_COOKIE_KEY, token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //MS
    httpOnly: true,
    sameSite: "none",
    secure: NODE_ENV !== "dev",
  });
};

export default generateTokenAndSetCookie;
