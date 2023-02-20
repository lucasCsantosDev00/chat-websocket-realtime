import * as dotenv from "dotenv";
dotenv.config();
import { fileURLToPath } from "url";
import path, { dirname } from "path";

import { writeFile } from "fs";

import { Server } from "socket.io";
import http from "http";
import express from "express";
import mongoose from "mongoose";
import { Database } from "./connect.js";

import AuthMiddleware from './middlewares/auth.js'

import routes from "./routes/router.js";
import cors from "cors";

const port = process.env.PORT

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

// wsServer
const server = http.createServer(app);
const io = new Server(server, {
  origin: ["http://localhost:2000/", "echo-protocol"],

  transports: ["websocket"],
  credentials: true,
  methods: ["GET", "POST"],
  maxHttpBufferSize: 1e7, //10 mb
});

//WebSocket

io.use(AuthMiddleware)
.on("connection", (socket) => {

  
  
  socket.on("message", (message) => {
    message.id = socket.id;
    const { username, text } = message;
    console.log(`msg:${text} by ${username} ID : ${socket.id}`);
    //broadcast the message

    socket.broadcast.emit("broadcast", message);
  });

  socket.on("upload", async (file, callback) => {
    //setting a directory to store the file
    const __getDir = fileURLToPath(import.meta.url);

    const fileName = `/upload/${file.name}`;
    const __dirname = path.join(dirname(__getDir), fileName);

    const buffer = file.buffer;
    //save the file on disk
    writeFile(__dirname, buffer, (err) => {
      callback({ message: err ? err : " success" });
    });

    io.emit("file", file);
  });
})


//connect to mongodb
mongoose.set("strictQuery", true);

const connection = Database.connect(mongoose);

server.listen(port, () => {
  console.log("Server is running!");
});
