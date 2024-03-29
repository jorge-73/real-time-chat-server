import express from "express";
import cors from "cors";
import { PORT } from "./config/config.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/messages.routes.js";
import usersRouter from "./routes/users.routes.js";
import { connectDataBase } from "./utils/database.js";
import logger from "./utils/logger.js";
import { app, server } from "./socket/socket.js";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "https://real-time-chat-one-lemon.vercel.app",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the api" });
});
app.use("/api", authRouter.getRouter());
app.use("/api/messages", messageRouter.getRouter());
app.use("/api/users", usersRouter.getRouter());

connectDataBase();
server.listen(PORT, () =>
  logger.http(`Listening on port http://localhost:${PORT}`)
);
