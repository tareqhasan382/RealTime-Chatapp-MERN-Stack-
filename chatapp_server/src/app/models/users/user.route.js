const express = require("express");
const {
  createUserController,
  loginUserController,
  profile,
  getUser,
} = require("./user.controller");

const router = express.Router();

router.post("/signup", createUserController);
router.post("/login", loginUserController);
router.get("/profile", profile);
router.get("/user/:userId", getUser);

module.exports = router;
