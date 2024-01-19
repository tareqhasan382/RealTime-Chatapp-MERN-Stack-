const express = require("express");
const { createMessage, getMessages } = require("./message.controller");

const router = express.Router();

router.get("/message/:chatId", getMessages);
router.post("/message", createMessage);
module.exports = router;
