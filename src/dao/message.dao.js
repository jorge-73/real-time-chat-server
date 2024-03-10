import messageModel from "../models/message.model.js";

export default class MessageDAO {
  create = async (data) => await messageModel.create(data);
}
