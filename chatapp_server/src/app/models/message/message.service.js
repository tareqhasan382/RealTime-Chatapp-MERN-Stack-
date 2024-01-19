const MessageModel = require("./message.model");
const httpStatus = require("http-status");
const createMessage = async (data) => {
  console.log("service data:", data);
  const createdChat = await MessageModel.create({
    chatId: "65a56fe8bdcad0b18e25211f",
    senderId: "65a414e17dbb027efc33cafd",
    text: "hello How are you",
  });
  if (!createdChat) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to created!");
  }
  return createdChat;
};

module.exports = {
  createMessage,
};
