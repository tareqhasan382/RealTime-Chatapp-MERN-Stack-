const ChatModel = require("./chat.model");
// const { createChat, getChat, findChatById } = require("./chat.service");
const createChatController = async (req, res) => {
  // console.log("data:", req.body);
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.reciverId],
  });
  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      status: "false",
      message: "Chat Created Successfully!",
      data: error,
    });
  }
};
const getChatController = async (req, res) => {
  // console.log("params userId:", req.params);
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({
      status: "false",
      message: "Something went to wrong!",
      data: error,
    });
  }
};
const findChat = async (req, res) => {
  //  firstId  secondId
  // console.log("params firstId secondId:", req.params);
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({
      status: "false",
      message: "Something went to wrong!",
      data: error,
    });
  }
};
const findAllChat = async (req, res) => {
  //  firstId  secondId
  // console.log("params firstId secondId:", req.params);

  try {
    const chat = await ChatModel.find();
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({
      status: "false",
      message: "Something went to wrong!",
      data: error,
    });
  }
};
module.exports = {
  createChatController,
  getChatController,
  findChat,
  findAllChat,
};
