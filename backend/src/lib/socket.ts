import { Server } from "socket.io";
import http from "http";
import express from "express";
import { Socket } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

// used to store online users
const userSocketMap: { [key: string]: string } = {};

export function getReceiverSocketId(userId: string): string | undefined {
  return userSocketMap[userId];
}

io.on("connection", (socket: Socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId as string;
  if (userId) userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
