import AppRouter from "./router.js";
import authControllers from "../controllers/auth.controllers.js";

class AuthRouter extends AppRouter {
  init() {
    this.post("/login", authControllers.login);
    this.post("/register", authControllers.register);
    this.post("/logout", authControllers.logout);
  }
}

const authRouter = new AuthRouter();
export default authRouter;
