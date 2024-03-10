import mongoose from "mongoose";

const userCollection = "User";

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    gender: { type: String, required: true, enum: ["male", "female"] },
    profilePic: { type: String, default: "" },
  },
  { timestamps: true }
);

mongoose.set("strictQuery", false);
const userModel = mongoose.model(userCollection, userSchema);
export default userModel;
