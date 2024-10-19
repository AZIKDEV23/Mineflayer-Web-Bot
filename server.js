const express = require("express");
const mineflayer = require("mineflayer");
const bodyParser = require("body-parser");
const path = require("path");

const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/start-bot", (req, res) => {
  const { username, server, port } = req.body;

  const bot = mineflayer.createBot({
    host: server,
    port: parseInt(port),
    username: username,
  });

  bot.on("login", () => {
    console.log("Bot o`yinda");
  });

  bot.on("end", () => {
    console.log("Bot serverdan chiqdi");
  });

  res.send("Bot ishlamoqda");
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
