const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

server.listen(2000, () => {
  console.log("Server Started on port 2000");
});
