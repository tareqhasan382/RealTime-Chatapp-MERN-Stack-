const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    chatId: { type: String, required: true },
    senderId: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("Messages", MessageSchema);

module.exports = MessageModel;
