export default class ConversationRepository {
  constructor(dao) {
    this.dao = dao;
  }
  findOne = async (senderId, reciverId) =>
    await this.dao.findOne(senderId, reciverId);
  create = async (senderId, reciverId) =>
    await this.dao.create(senderId, reciverId);
  update = async (id, data) => await this.dao.update(id, data);
}
