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

    const result = await response.json();
    console.log(result.message);

    if (result.success) {
      bot = true; // Bot muvaffaqiyatli ulanishni bildiradi
      document.querySelector(".color").style.color = "green"; // Tugma rangini yashilga o'zgartirish
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

    const result = await response.json();
    console.log(result.message);

    bot = false; // Bot ulanishni tugatganini bildiradi
    document.querySelector(".color").style.color = "red"; // Tugma rangini qizilga o'zgartirish
  } else {
    console.log("Bot hali ulanishni boshlamagan.");
  }
});
