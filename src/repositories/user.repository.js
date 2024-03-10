export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }
  find = async () => await this.dao.find();
  findUsersForSidebar = async (id) => await this.dao.findUsersForSidebar(id);
  findOne = async (user) => await this.dao.findOne(user);
  findById = async (id) => await this.dao.findById(id);
  create = async (user) => await this.dao.create(user);
  update = async (id, data) => await this.dao.update(id, data);
  delete = async (id) => await this.dao.delete(id);
}
