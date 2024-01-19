const MessageModel = require("./message.model");
const createMessage = async (req, res) => {
  // console.log("send Message:", req.body);
  try {
    const { chatId, senderId, text } = req.body;

    // console.log("send Message:", chatId, senderId, text);
    const newMessage = new MessageModel({ chatId, senderId, text });
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};
const getMessages = async (req, res) => {
  const { chatId } = req.params;
  // console.log("chatId...........:", req.params);
  try {
    const result = await MessageModel.find({ chatId });
    // console.log("message:", result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json("Something went to wrong");
  }
};

module.exports = {
  createMessage,
  getMessages,
};
