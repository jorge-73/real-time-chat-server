import logger from "../utils/logger.js";
import { ConversationService } from "../services/conversation.service.js";
import { MessageService } from "../services/message.service.js";

class MessageControllers {
  async getMessage(req, res) {
    try {
      const userToChatId = req.params.id;
      const senderId = req.user._id;
      const conversation = await ConversationService.findOne(
        senderId,
        userToChatId
      );
      if (!conversation) return res.sendRequestError("Conversation not found");
      const messages = conversation.messages;
      res.sendSuccess(messages);
    } catch (error) {
      logger.error("Get message error", error.message);
      res.sendServerError(error.message);
    }
  }
  async sendMessage(req, res) {
    try {
      const receiverId = req.params.id;
      const senderId = req.user._id;
      const { message } = req.body;

      let conversation = await ConversationService.findOne(
        senderId,
        receiverId
      );
      if (!conversation) {
        conversation = await ConversationService.create(senderId, receiverId);
      }
      const newMessage = await MessageService.create({
        senderId,
        receiverId,
        message,
      });

      if (newMessage) {
        conversation.messages.push(newMessage._id);
        await ConversationService.update(conversation._id, conversation);
      }
      res.createdSuccess(newMessage);
    } catch (error) {
      logger.error("Send message error", error.message);
      res.sendServerError(error);
    }
  }
}

const messageControllers = new MessageControllers();
export default messageControllers;
