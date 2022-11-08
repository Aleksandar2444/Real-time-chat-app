const express = require("express");
const app = express();
const { createServer } = require("http");
const server = createServer(app);

const { Server } = require("socket.io");
// const port = "https://fastapp-chatapp.herokuapp.com/";
const port = process.env.PORT || 5000;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_room", ({ user, room }) => {
    socket.join(room);
  });

  socket.on("send_msg", ({ room, user, message }) => {
    const dialog = { user: user, message: message };
    socket.to(room).emit("receive_msg", dialog);
  });
});

server.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
});
