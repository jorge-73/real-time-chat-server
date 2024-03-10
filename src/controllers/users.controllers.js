import { UserService } from "../services/user.service.js";
import logger from "../utils/logger.js";

class UsersControllers {
  async getUsersForSidebar(req, res) {
    try {
      const loggedInUserId = req.user._id;

      const filteredUsers = await UserService.findUsersForSidebar(loggedInUserId);

      if (!filteredUsers) return res.sendRequestError("Users not found");

      res.sendSuccess( filteredUsers );
    } catch (error) {
      logger.error("Get users error", error.message);
      res.sendServerError(error.message);
    }
  }
}

const usersControllers = new UsersControllers();
export default usersControllers;
