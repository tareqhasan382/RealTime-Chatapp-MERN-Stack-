const express = require("express");
const app = express();
const cors = require("cors");
const httpStatus = require("http-status");
const cookieParser = require("cookie-parser");
const userRoute = require("../src/app/models/users/user.route");
const chatRoute = require("../src/app/models/chat/chat.route");
const mesageRoute = require("../src/app/models/message/message.route");

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/test", (req, res) => {
  res.json("Hello world...");
});

app.use("/api/v1", userRoute);
app.use("/api/v1", chatRoute);
app.use("/api/v1", mesageRoute);

app.use((req, res, next) => {
  res.status(httpStatus.BAD_REQUEST).json({
    success: false,
    messase: "Not Found",
    errorMessage: [
      {
        path: req.originalUrl,
        message: "API NOT FOUND!",
      },
    ],
  });
  next();
});

module.exports = app;
