import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import {Router} from "./src/routes.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
    console.log("connect")
    socket.emit("hello", "world");
});

app.use('/api', Router)

httpServer.listen(5000);
