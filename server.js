const express = require("express");
const mineflayer = require("mineflayer");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;
let bot;

app.use(express.static("public"));
app.use(bodyParser.json());

app.post("/connect", (req, res) => {
  const { host, port, username, version } = req.body;
  bot = mineflayer.createBot({
    host: host,
    port: parseInt(port),
    username: username,
    version: version,
  });

  bot.on("login", () => {
    res.json({
      message: `${username} muvaffaqiyatli ulanish amalga oshirildi!`,
      success: true,
    });
  });

  bot.on("error", (err) => {
    res.json({ message: `Xatolik yuz berdi: ${err}`, success: false });
  });

  bot.on("end", () => {
    console.log("Bot ulanishni tugatdi.");
  });
});

app.post("/disconnect", (req, res) => {
  if (bot) {
    bot.end();
    res.json({ message: "Bot serverdan chiqdi.", success: true });
  } else {
    res.json({ message: "Bot hali ulanishni boshlamagan.", success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} da ishlamoqda`);
});
