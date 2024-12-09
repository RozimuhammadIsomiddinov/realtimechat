const path = require("path");
const fs = require("fs");

const http = require("http");
const express = require("express");
const dotenv = require("dotenv");
const { Server } = require("socket.io");
const formatMessage = require("./messages");
const fileUpload = require("./middleware/multer");

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const { createUser } = require("./modules/user/user");
app.use(express.static(path.join(__dirname, "client")));

// Create upload directory if it does not exist
const publicFolderPath = path.join(__dirname, "public");
const imagesFolderPath = path.join(publicFolderPath, "images");

// Public papkasini yaratish
if (!fs.existsSync(publicFolderPath)) {
  fs.mkdirSync(publicFolderPath);
  console.log("Public folder created successfully.");
} else {
  console.log("Public folder already exists.");
}

// Images papkasini yaratish
if (!fs.existsSync(imagesFolderPath)) {
  fs.mkdirSync(imagesFolderPath);
  console.log("Images folder created successfully.");
} else {
  console.log("Images folder already exists within the public folder.");
}

// Fayl yuklash uchun marshrut
app.post("/upload", fileUpload.single("file"), (req, res) => {
  res.send("Fayl muvaffaqiyatli yuklandi!");
});
const port = process.env.PORT;
io.on("connection", (socket) => {
  console.log(`Foydalanuvchi ulandi :`, socket.id);

  // Foydalanuvchi chatga kirganda
  socket.on("join", async ({ username }) => {
    // Foydalanuvchiga xush kelibsiz xabar
    let users = await createUser(socket.id, username);
    console.log(users);
    socket.emit(
      "message",
      formatMessage("admin", `${username}  Chat App'ga xush kelibsiz!`)
    );

    // Foydalanuvchi chatga kirganini boshqalarga e'lon qilish
    socket.broadcast.emit(
      "message",
      formatMessage("Admin", `${username} chatga qo'shildi`)
    );
    io.emit("usersList", users);
    // Foydalanuvchi uzilganda
    socket.on("disconnect", () => {
      console.log("Foydalanuvchi uzildi: ", socket.id);
      users = users.filter((user) => user.id !== socket.id);
      io.emit(
        "message",
        formatMessage("Admin", `${username} chatni tark etdi`)
      );
      io.emit("usersList", users);
    });

    // Foydalanuvchi xabar yozganda
    socket.on("chatMessage", (msg) => {
      io.emit("message", formatMessage(username, msg));
    });
  });
});

server.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
});
