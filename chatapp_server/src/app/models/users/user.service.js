const UserModel = require("./user.model");
const config = require("../../../config/config");
const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const createUser = async (user) => {
  console.log("service data:", user);
  const createdUser = await UserModel.create(user);
  // console.log("createdUser:", createdUser);
  if (!createdUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create User!");
  }
  return createdUser;
};

const loginUser = async (payload) => {
  const { email } = payload;
  // console.log("payload:", payload);
  // check exist user
  const isUserExist = await UserModel.findOne(
    { email },
    { email: 1, password: 1, role: 1, name: 1 }
  );

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }
  // check match password

  // create jwt token
  const accessToken = jwt.sign(
    {
      userId: isUserExist._id,
      email: isUserExist.email,
      name: isUserExist.name,
      role: isUserExist.role,
    },
    config.secret,
    { expiresIn: "1d" }
  );
  //console.log("accessToken:", accessToken);
  // console.log('access token : ', accessToken)
  // const refreshToken = jwt.sign(
  //   {
  //     userId: isUserExist._id,
  //     email: isUserExist.email,
  //     name: isUserExist.name,
  //     role: isUserExist.role,
  //   },
  //   config.refresh_secret,
  //   { expiresIn: "365d" }
  // );
  // console.log("refreshToken:", refreshToken);
  return { accessToken };
};

module.exports = {
  createUser,
  loginUser,
};
