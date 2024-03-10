import mongoose from "mongoose";

const conversationCollection = "Conversation";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

conversationSchema.pre("findOne", function () {
  this.populate("messages");
});

const conversationModel = mongoose.model(
  conversationCollection,
  conversationSchema
);
export default conversationModel;
