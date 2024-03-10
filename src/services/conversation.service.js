import ConversationDAO from "../dao/conversation.dao.js";
import ConversationRepository from "../repositories/conversation.repository.js";

export const ConversationService = new ConversationRepository(
  new ConversationDAO()
);
