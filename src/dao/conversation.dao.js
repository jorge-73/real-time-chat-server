import conversationModel from "../models/conversation.model.js";

export default class ConversationDAO {
  findOne = async (senderId, reciverId) =>
    await conversationModel.findOne({
      participants: { $all: [senderId, reciverId] },
    });
  create = async (senderId, reciverId) =>
    await conversationModel.create({
      participants: [senderId, reciverId],
    });
  update = async (id, data) =>
    await conversationModel.findByIdAndUpdate(id, data, { new: true });
}
