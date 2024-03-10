import MessageDAO from "../dao/message.dao.js";
import MessageRepository from "../repositories/message.repository.js";

export const MessageService = new MessageRepository(new MessageDAO());
