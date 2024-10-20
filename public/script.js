let bot;
document
  .getElementById("start")
  .addEventListener("click", async function (event) {
    event.preventDefault();
    const host = document.getElementById("host").value;
    const port = document.getElementById("port").value;
    const username = document.getElementById("username").value;
    const version = document.getElementById("version").value;
    const response = await fetch("/connect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ host, port, username, version }),
    });

    if (!response.ok) {
      console.error("Server xatosi:", response.statusText);
      return;
    }

    const result = await response.json().catch((err) => {
      console.error("JSON parse xatosi:", err);
    });

    if (result && result.message) {
      console.log(result.message);
      if (result.success) {
        bot = true;
        document.querySelector(".color").style.color = "green";
      }
    }
  });

document.getElementById("quit").addEventListener("click", async function () {
  if (bot) {
    const response = await fetch("/disconnect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Server xatosi:", response.statusText);
      return;
    }

    const result = await response.json().catch((err) => {
      console.error("JSON parse xatosi:", err);
    });

    if (result && result.message) {
      console.log(result.message);
      bot = false;
      document.querySelector(".color").style.color = "red";
    }
  } else {
    console.log("Bot hali ulanishni boshlamagan.");
  }
});
