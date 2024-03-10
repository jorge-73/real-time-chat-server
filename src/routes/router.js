import { Router } from "express";
import logger from "../utils/logger.js";

export default class AppRouter {
  constructor() {
    this.router = Router();
    this.init();
  }
  getRouter() {
    return this.router;
  }
  init() {}

  get(path, ...callbacks) {
    this.router.get(
      path,
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }
  post(path, ...callbacks) {
    this.router.post(
      path,
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }
  put(path, ...callbacks) {
    this.router.put(
      path,
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }
  delete(path, ...callbacks) {
    this.router.delete(
      path,
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        logger.error(error);
        params[1].status(500).json({ error });
      }
    });
  }

  generateCustomResponses = (req, res, next) => {
    res.sendSuccess = (payload) => res.json({ status: "success", payload });
    res.createdSuccess = (payload) =>
      res.status(201).json({ status: "success", payload });
    res.sendNoContent = (payload) =>
      res.status(204).json({ status: "success", payload });
    res.sendUserError = (error) =>
      res.status(400).json({ status: "error", error });
    res.authFailError = (error) =>
      res.status(401).json({ status: "error", error });
    res.sendRequestError = (error) =>
      res.status(404).json({ status: "error", error });
    res.sendServerError = (error) =>
      res.status(500).json({ status: "error", error });
    next();
  };
}
