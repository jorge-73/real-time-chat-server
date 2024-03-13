import conversationModel from "../models/conversation.model.js";

export default class ConversationDAO {
  findOne = async (senderId, receiverId) =>
    await conversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });
  create = async (senderId, receiverId) =>
    await conversationModel.create({
      participants: [senderId, receiverId],
    });
  update = async (id, data) =>
    await conversationModel.findByIdAndUpdate(id, data, { new: true });
}
