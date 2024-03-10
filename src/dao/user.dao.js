import userModel from "../models/user.model.js";

export default class UserDAO {
  find = async () => await userModel.find();
  findUsersForSidebar = async (id) =>
    await userModel.find({ _id: { $ne: id } }).select("-password");
  findOne = async (user) => await userModel.findOne(user);
  findById = async (id) => await userModel.findById(id);
  create = async (user) => await userModel.create(user);
  update = async (id, data) =>
    await userModel.findByIdAndUpdate(id, data, { new: true });
  delete = async (id) => await userModel.findByIdAndDelete(id);
}
