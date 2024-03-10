import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";
import { PRIVATE_KEY } from "../config/config.js";
import { UserService } from "../services/user.service.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    const decoded = jwt.verify(token, PRIVATE_KEY);
    if (!decoded)
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    const userFound = await UserService.findById(decoded.userId);
    if (!userFound) return res.status(404).json({ error: "User not found" });
    const user = {
      _id: userFound._id,
      fullname: userFound.fullname,
      username: userFound.username,
      gender: userFound.gender,
      profilePic: userFound.profilePic,
    };
    req.user = user;
    next();
  } catch (error) {
    logger.error("Error in protect Route middleware: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
