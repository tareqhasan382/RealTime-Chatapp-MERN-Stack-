const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const config = require("../../../config/config");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  // hashing password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds)
  );
  next();
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
