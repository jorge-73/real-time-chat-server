import AppRouter from "./router.js";
import messageControllers from "../controllers/messages.controllers.js";
import protectRoute from "../middleware/protectRoute.js";

class MessageRouter extends AppRouter {
  init() {
    this.get("/:id", protectRoute, messageControllers.getMessage);
    this.post("/send/:id", protectRoute, messageControllers.sendMessage);
  }
}

const messageRouter = new MessageRouter();
export default messageRouter;
