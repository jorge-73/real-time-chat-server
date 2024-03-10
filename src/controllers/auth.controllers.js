import logger from "../utils/logger.js";
import { UserService } from "../services/user.service.js";
import {
  createHash,
  generateTokenAndSetCookie,
  isValidPassword,
} from "../utils/utils.js";
import { SIGNED_COOKIE_KEY } from "../config/config.js";

class AuthControllers {
  async register(req, res) {
    try {
      const { fullname, username, password, confirmPassword, gender } =
        req.body;
      if (!fullname || !username || !password || !confirmPassword || !gender) {
        return res.sendUserError("user data is missing");
      }
      if (password !== confirmPassword)
        return res.sendUserError("Passwords don't match");
      const user = await UserService.findOne({ username });
      if (user) return res.sendUserError("Username already exists");

      const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
      const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

      const newUser = {
        fullname,
        username,
        password: createHash(password),
        gender,
        profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
      };
      const userCreated = await UserService.create(newUser);
      generateTokenAndSetCookie(userCreated._id, res);
      res.createdSuccess({
        _id: userCreated._id,
        fullname: userCreated.fullname,
        username: userCreated.username,
        profilePic: userCreated.profilePic,
      });
    } catch (error) {
      logger.error(error.message);
      res.sendServerError(error);
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.sendUserError("user data is missing");
      }
      const user = await UserService.findOne({ username });
      if (!user || !isValidPassword(password, user))
        return res.sendUserError("invalid Credentials");

      generateTokenAndSetCookie(user._id, res);

      res.sendSuccess({
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        profilePic: user.profilePic,
      });
    } catch (error) {
      logger.error(error.message);
      res.sendServerError(error);
    }
  }
  async logout(req, res) {
    try {
      res.clearCookie(SIGNED_COOKIE_KEY).sendSuccess("logged out successfully");
    } catch (error) {
      logger.error(error.message);
      res.sendServerError(error);
    }
  }
}

const authControllers = new AuthControllers();
export default authControllers;
