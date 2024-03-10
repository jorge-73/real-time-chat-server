import AppRouter from "./router.js";
import protectRoute from "../middleware/protectRoute.js";
import usersControllers from "../controllers/users.controllers.js";

class UsersRouter extends AppRouter {
  init() {
    this.get("/", protectRoute, usersControllers.getUsersForSidebar)
  }
}

const usersRouter = new UsersRouter();
export default usersRouter;