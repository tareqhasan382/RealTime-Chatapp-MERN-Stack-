const ChatModel = require("./chat.model");
const httpStatus = require("http-status");
const createChat = async (user) => {
  console.log("service data:", user);
  const createdChat = await ChatModel.create(user);
  if (!createdChat) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to created!");
  }
  return createdChat;
};
const getChat = async (userId) => {
  console.log("service data:", user);
  const createdChat = await ChatModel.find({ _id: userId });
  if (!createdChat) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to created!");
  }
  return createdChat;
};
const findChatById = async (payload) => {
  console.log("service data:", user);
  const createdChat = await ChatModel.find({ _id: userId });
  if (!createdChat) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to created!");
  }
  return createdChat;
};
module.exports = {
  createChat,
  getChat,
  findChatById,
};
