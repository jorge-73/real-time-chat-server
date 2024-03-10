export default class MessageRepository {
  constructor(dao) {
    this.dao = dao;
  }
  create = async (data) => await this.dao.create(data);
}
