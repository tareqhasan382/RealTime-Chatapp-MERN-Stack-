const dotenv = require("dotenv");
dotenv.config();
// dotenv.config({ path: Path.join(process.cwd(), ".env") });

// export default {
//   env: process.env.NODE_ENV,
//   port: process.env.PORT,
//   database_url: process.env.DATABASE_URL,
//   bycrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
//   jwt: {
//     secret: process.env.JWT_SECRET,
//     refresh_secret: process.env.JWT_REFRESH_SECRET,
//     expires_in: process.env.JWT_EXPIRES_IN,
//     refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
//   },
// };

// config.js
module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bycrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS, // You can adjust the number of rounds as needed
  secret: process.env.JWT_SECRET,
  // Other configuration options...
};
