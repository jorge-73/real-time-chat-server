import UserDAO from "../dao/user.dao.js";
import UserRepository from "../repositories/user.repository.js";

export const UserService = new UserRepository(new UserDAO());
