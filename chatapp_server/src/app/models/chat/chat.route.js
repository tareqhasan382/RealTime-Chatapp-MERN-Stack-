const express = require("express");
const {
  createChatController,
  getChatController,
  findAllChat,
  findChat,
} = require("./chat.controller");

const router = express.Router();

router.get("/chat", findAllChat);
router.post("/chat", createChatController);
router.get("/chat/:userId", getChatController);
router.get("/find/:firstId/:secondId", findChat);

module.exports = router;
