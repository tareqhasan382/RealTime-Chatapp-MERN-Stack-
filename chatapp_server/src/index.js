const dotenv = require("dotenv");
const app = require("./app");
const mongoose = require("mongoose");
const config = require("./config/config");
const { Server } = require("socket.io");
const http = require("http");
dotenv.config();

//=======uncaught Exception handle=======
process.on("uncaughtException", (error) => {
  console.log(error);
  process.exit(1);
});
//=========httpServer=============
let server;
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});
async function main() {
  try {
    await mongoose.connect(config.database_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Database is connected successfully`);

    server = httpServer.listen(process.env.PORT, () => {
      console.log(`Application app listening on port ${process.env.PORT}`);
    });
    //================================ WebSocket server start==============================================
    let users = [];
    const addUser = (userId, socketId) => {
      !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
    };

    const getUser = (receiverId) => {
      return users.find((user) => user.userId === receiverId);
    };
    const removeUser = (socketId) => {
      users = users.filter((user) => user.socketId !== socketId);
    };
    io.on("connection", (socket) => {
      //=======when user connect=====================
      console.log("A user connected socket");
      // take userId and socketId from user
      socket.on("addUser", (userId) => {
        if (userId) {
          addUser(userId, socket.id);
        }
        io.emit("getUsersFromSocketServer", users);
      });

      //=======send and get message start===================
      socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        console.log("user:", user);
        if (user) {
          io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
          });
        }
      });
      //=======send and get message end=====================
      //=======when user disConnect=========================
      socket.on("disconnect", () => {
        //  console.log("disconnected a user:");
        removeUser(socket.id);
        io.emit("getUsersFromSocketServer", users);
      });
      //============
    });
    //================================ WebSocket server end==============================================
  } catch (error) {
    console.log("Failed to connect to the Database", error);
  }

  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

process.on("SIGTERM", () => {
  console.log("SIGTERM is received");
  if (server) {
    server.close();
  }
});
