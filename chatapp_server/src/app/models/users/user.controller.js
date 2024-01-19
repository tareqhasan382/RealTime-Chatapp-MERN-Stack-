const UserModel = require("./user.model");
const { createUser, loginUser } = require("./user.service");
const bcrypt = require("bcrypt");
const httpStatus = require("http-status");
const config = require("../../../config/config");
const jwt = require("jsonwebtoken");
const createUserController = async (req, res) => {
  const data = req.body;
  //console.log("req data:", data);
  const existUser = await UserModel.findOne({ email: data.email });
  //console.log("existUser:", data);
  if (existUser) {
    return res.json({ status: "false", message: "user already Exist!" });
  }

  const result = await createUser(data);
  // console.log("result:", result);
  return res.json({
    status: "true",
    message: "Account created successfully!",
    data: result,
  });
};

const loginUserController = async (req, res) => {
  const data = req.body;
  // console.log("data:", data);
  const isUserExist = await UserModel.findOne({ email: data.email }).select(
    "password"
  );
  // check isExist User
  if (!isUserExist) {
    return res.json({
      statusCode: httpStatus.NOT_FOUND,
      message: "User does`t exist",
    });
  }
  const isMatchPassword = await bcrypt.compare(
    data.password,
    isUserExist?.password
  );
  if (!isMatchPassword) {
    return res.json({
      statusCode: httpStatus.UNAUTHORIZED,
      message: "Password is incorrect",
    });
  }

  const result = await loginUser(data);
  // console.log("result:", result);
  const token = result;
  // console.log("token:", token.accessToken);
  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === "production" ? true : false,
    httpOnly: true,
  };

  res.cookie("token", token.accessToken, cookieOptions);

  return res
    .cookie("token", token.accessToken, {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    })
    .json({
      status: "true",
      message: "User logged in successfully!",
      data: token,
    });
};
const profile = async (req, res) => {
  // const cookies = req.headers.cookie;
  const cookies = req.cookies?.token;
  // console.log("cookie:", cookies);
  if (cookies) {
    const user = jwt.verify(cookies, config.secret);
    //  console.log("user:", user);
    res.json(user);
  } else {
    res.status(401).json("no token");
  }
};
const getUser = async (req, res) => {
  const { userId } = req.params;
  // console.log("chatId...........:", userId);
  try {
    const result = await UserModel.findById({ _id: userId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json("Something went to wrong");
  }
};
module.exports = {
  createUserController,
  loginUserController,
  profile,
  getUser,
};
