import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User ID :- ${socket.id} joined room : ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log("send message data ", data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected..", socket.id);
  });
});

app.use(cors());

export { app, io, server };
